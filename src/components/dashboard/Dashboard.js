import React, {Component} from 'react'
import SnapshotList from '../snapshots/SnapshotList'
import { connect } from 'react-redux'
//import { firestoreConnect } from 'react-redux-firebase'
//import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import {fetchSnapshots} from '../../store/actions/snapshotActions'
import RotatingLoadBar from '../layout/RotatingLoadBar'
class Dashboard extends Component {

    componentDidMount()
    {
       const {fetchSnapshots} = this.props;
       fetchSnapshots();
    }

    render() {
        const { snapshots, error, isLoaded, auth } = this.props
        if(!auth.uid) return <Redirect to='/signin' />

        //if(!isLoaded) return <RotatingLoadBar />
        else
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s4 push-s4">

                            <div className="red-text center">
                                {error ? <p>{error}</p> : null}
                            </div>

                            <SnapshotList snapshots={snapshots}/>

                        </div>
                    </div>
                </div>
        )
    }
} 

const mapStateToProps = (state) => {
    console.log(state);
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