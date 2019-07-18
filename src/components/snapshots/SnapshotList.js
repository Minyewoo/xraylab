import React from 'react'
import SnapshotSummary from './SnapshotSummary';

const SnapshotList = ({snapshots}) => {
    return (
        <div className="snapshot-list section">
            { snapshots && snapshots.map(snapshot => {
                return (
                    <SnapshotSummary snapshot={snapshot} key={snapshot.id} />
                )
            })}
        </div>
    )
}

export default SnapshotList;