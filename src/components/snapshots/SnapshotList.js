import React from 'react'
import SnapshotSummary from './SnapshotSummary';
import { Link } from 'react-router-dom'

const SnapshotList = ({snapshots}) => {
    //console.log(snapshots);
    return (
        <React.Fragment>
            { snapshots && snapshots.map(snapshot => {
                //let index = snapshots.indexOf(snapshot);
                return (
                    <Link className="snapshot__link--wrapper" to={'/snapshot/' + snapshot.id} key={snapshot.id}>
                        <SnapshotSummary snapshot={snapshot}/>
                    </Link>
                )
            })}
        </React.Fragment>
    )
}

export default SnapshotList;