import React from 'react';

const SnapshotSummary = ({snapshot}) => {
    return (
        <div className="card z-depth-0 snapshot-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{snapshot.title}</span>
                <p>Posted by Minyewoo</p>
                <p className="grey-text">29th June, 0pm</p>
            </div>
        </div>
    )
}

export default SnapshotSummary;