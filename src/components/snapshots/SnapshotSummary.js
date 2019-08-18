import React from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'
import "./Snapshot.css"

const SnapshotSummary = ({snapshot}) => {
    return (
        <div className="snapshot">
            <img className="snapshot__img" src={process.env.PUBLIC_URL + snapshot.image_path} alt=''/>
			<div className="snapshot__content content--snapshot"> 
				<div className="content--snapshot__title"> {moment(new Date(snapshot.created)).calendar()} </div>
				<Link className="content--snapshot__link--more" to={'/snapshot/' + snapshot.id} key={snapshot.id}> Details </Link>
			</div>
		</div>
    )
}

export default SnapshotSummary;