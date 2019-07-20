import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

function timestampToDate(timestamp) {
    return Date(timestamp.miliseconds * 1000);
}

const SnapshotDetails = (props) => {
    console.log(props);
    const { snapshot } = props;
    if (snapshot) {
        return (
            <div className="container section snapshot-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Snapshot #{props.match.params.id}</span>
                        <img src={snapshot.image} alt="Red dot" />
                        <img src={snapshot.mask} alt="Red dot" />
                        <p>{snapshot.conclusion}</p>
                    </div>
                    <div className="card-action gret lighten-4 grey-text">
                        <div>Posted by {snapshot.authorId}</div>
                        <p className="grey-text">{timestampToDate(snapshot.createdAt)}</p>
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
    const snapshots = state.firestore.data.snapshots;
    const snapshot = snapshots ? snapshots[id] : null;
    return {
        snapshot: snapshot
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'snapshots'}
    ])
)(SnapshotDetails)
