import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const SnapshotDetails = (props) => {
    //console.log(props);
    const { snapshot, auth } = props;
    if(!auth.uid) return <Redirect to='/signin' />

    if (snapshot) {

        return (
            
            <div className="container section snapshot-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Snapshot #{props.match.params.id}</span>
                        <img src={process.env.PUBLIC_URL + snapshot.image_path} alt='' style={{ maxWidth: 200, maxHeight: 200}}/>
                        <img src={process.env.PUBLIC_URL + snapshot.mask_path}  alt='' style={{ maxWidth: 200, maxHeight: 200}}/>
                        <p>{snapshot.conclusion}</p>
                    </div>
                    <div className="card-action gret lighten-4 grey-text">
                        <p className="grey-text">{moment(new Date(snapshot.created)).calendar()}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const snapshots = state.snapshot.snapshots;
    const snapshot = snapshots ? snapshots.find((snapshot) => {return snapshot.id == id}) : null;
    return {
        snapshot: snapshot,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'snapshots'}
    ])
)(SnapshotDetails)
