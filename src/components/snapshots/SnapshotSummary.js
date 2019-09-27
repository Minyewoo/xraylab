import React from 'react';
import moment from 'moment'
import "./Snapshot.css"
import "moment/locale/ru"
const SnapshotSummary = ({snapshot}) => {
	var date = moment(new Date(snapshot.created));
	date.locale(window.navigator.userLanguage || window.navigator.language);
    return (
        <div className="snapshot">
            <img className="snapshot__img" src={process.env.PUBLIC_URL + snapshot.image_path} alt=''/>
			<div className="snapshot__content content--snapshot">
				<div className="content--snapshot__title">
					<p className="stroked">{date.format("DD.MM.YY")}</p>
					<p className="stroked">{date.format("LT")}</p>
				</div>
				<div className="content--snapshot__link--more stroked"> Details </div>
				<div className="content--snapshot__note stroked">
					{/* Pomit' ochko. Povtorno.s */} Note
				</div>
			</div>
		</div>
    )
}

export default SnapshotSummary;