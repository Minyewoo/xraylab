import React, { Component } from 'react'
import SnapshotList from '../snapshots/SnapshotList'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchSnapshots } from '../../store/actions/snapshotActions'
import RotatingLoadBar from '../layout/RotatingLoadBar'
import './Dashboard.css';
import { NavLink } from 'react-router-dom';
class DashboardPinned extends Component {

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
                        <ul className="nav--auth col-xs-12 nav--dashboard">
                            <li className="nav--auth__item nav__item"><NavLink className="nav--auth__link" to="/dashboard/all">All</NavLink></li>
                            <li className="nav--auth__item nav__item" state="current"><NavLink className="nav--auth__link" to='/dashboard/pinned'>Pinned</NavLink></li>
                        </ul>
                        <div className="dashboard--grid col-xs-12">
                            {snapshots ? <SnapshotList snapshots={snapshots} /> : ""}
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
        snapshots: state.snapshot.snapshots.filter(snapshot => snapshot.pinned),
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPinned);
