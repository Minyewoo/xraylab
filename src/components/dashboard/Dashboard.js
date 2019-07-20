import React, {Component} from 'react'
import SnapshotList from '../snapshots/SnapshotList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
class Dashboard extends Component {
    render() {
        //console.log(this.props)
        const { snapshots, auth } = this.props
        if(!auth.uid) return <Redirect to='/signin' />
        

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
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
        snapshots: state.firestore.ordered.snapshots,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'snapshots' }
    ])
)(Dashboard);