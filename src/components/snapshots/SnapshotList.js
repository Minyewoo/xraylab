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
                        <SnapshotSummary snapshot={snapshot} key={snapshot.id}/>
                )
            })}
        </React.Fragment>
    )
}

export default SnapshotList;
