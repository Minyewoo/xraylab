import React from 'react'
import SnapshotSummary from './SnapshotSummary';
import { Link } from 'react-router-dom'

const SnapshotList = ({snapshots}) => {
    return (
        <div className="snapshot-list section">
            { snapshots && snapshots.map(snapshot => {
                return (
                    <Link to={'/snapshot/' + snapshot.id}>
                        <SnapshotSummary snapshot={snapshot} key={snapshot.id} />
                    </Link>
                )
            })}
        </div>
    )
}

export default SnapshotList;