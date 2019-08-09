import React from 'react';
import moment from 'moment'

const SnapshotSummary = ({snapshot}) => {
    return (
        <div className="card z-depth-0 snapshot-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">Snapshot #{snapshot.id}</span>
                <p className="grey-text">{moment(new Date(snapshot.created)).calendar()}</p>
            </div>
        </div>
    )
}

export default SnapshotSummary;
