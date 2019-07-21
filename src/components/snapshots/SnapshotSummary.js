import React from 'react';

const timestampToDate = (timestamp) => {
    return Date(timestamp.miliseconds * 1000);
}

const SnapshotSummary = ({snapshot}) => {
    return (
        <div className="card z-depth-0 snapshot-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">Snapshot #{snapshot.id}</span>
                <p className="grey-text">Posted by {snapshot.author}</p>
                <p className="grey-text">{timestampToDate(snapshot.createdAt)}</p>
            </div>
        </div>
    )
}

export default SnapshotSummary;
