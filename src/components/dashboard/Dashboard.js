import React, { Component } from 'react'
import SnapshotList from '../snapshots/SnapshotList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchSnapshots } from '../../store/actions/snapshotActions'
import RotatingLoadBar from '../layout/RotatingLoadBar'
import './Dashboard.css';

class Dashboard extends Component {

    componentDidMount() {
        const { fetchSnapshots } = this.props;
        fetchSnapshots();
    }

    render() {
        const { snapshots, error, isLoaded, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />

        if (!isLoaded) return <RotatingLoadBar />
        else
            return (
                <div className="page-layout">
                    <div className="row center-xs">
                        <div className="red-text center">
                            {error ? <p>{error}</p> : null}
                        </div>
                        <div className="dashboard--grid col-xs-12">
                            {snapshots ? <SnapshotList snapshots={snapshots} /> : null}
                            <Link className="snapshot__link--wrapper" to={'/create'}>
                                <div className="snapshot snapshot--new">
                                    <img className="snapshot__img" src={process.env.PUBLIC_URL + "/img/add.png"} alt=''/>
		                        </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        //snapshots: state.firestore.ordered.snapshots,
        error: state.snapshot.get_error,
        snapshots: state.snapshot.snapshots,
        isPending: state.snapshot.isPending,
        isLoaded: state.snapshot.isLoaded,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSnapshots: () => dispatch(fetchSnapshots())
    }
}

/*export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'snapshots' }
    ])
)(Dashboard);*/
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);