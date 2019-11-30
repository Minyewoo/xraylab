import React, { Component }  from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import "./Snapshot.css"
import "moment/locale/ru"
import {deleteSnapshot, pinSnapshot, unpinSnapshot} from '../../store/actions/snapshotActions'

const unpinned_state = {
	pinMode: 'unpinned',
	bookmarkStyle: 'bookmark_border'
}

const pinned_state = {
	pinMode: 'pinned',
	bookmarkStyle: 'bookmark'
}

export class SnapshotSummary extends Component {
	state = this.props.snapshot.pinned ? pinned_state : unpinned_state;

	toggle = () => {
		if (this.state.pinMode === "unpinned") {
		  this.props.pinSnapshot(this.props.snapshot.id)
		  this.setState(pinned_state);
		}
		else {
		  this.props.unpinSnapshot(this.props.snapshot.id)
		  this.setState(unpinned_state);
		}
	}

	delete_snap = (snap_id) => {
		var is_delete = window.confirm("Delete this snapshot?");
		if(is_delete)
			this.props.deleteSnapshot(snap_id);
	}

	render() {
	var snapshot = this.props.snapshot;
	var date = moment(new Date(snapshot.created));
	date.locale(window.navigator.userLanguage || window.navigator.language);
	
	

	if(!snapshot.description) {
		var note = "";
	}
	else
		var note =  <div className="content--snapshot__note stroked">
						{snapshot.description}
					</div>

	var pin_mode = 'unpinned'
	if (snapshot.pinned) pin_mode = 'pinned';

    return (
			<div className="snapshot">
					<img className="snapshot__img" src={process.env.PUBLIC_URL + snapshot.image_path} alt=''/>
					<div className="snapshot__content content--snapshot">
						<div className="content--snapshot__title">
							<p className="stroked">{date.format("DD.MM.YY")}</p>
							<p className="stroked">{date.format("LT")}</p>
						</div>
						
						<Link to={'/snapshot/' + snapshot.id}>
							<div className="content--snapshot__link--more stroked"> Details </div>
						</Link>
						
						{note}

						<button className="content--snapshot__delete" onClick={this.delete_snap.bind(this, snapshot.id)}>
							<i className="material-icons">delete_outline</i> 
						</button>

						<button className={"content--snapshot__pin " + this.state.pinMode} onClick={this.toggle}>
							<i className="material-icons">{this.state.bookmarkStyle}</i> 
						</button>
					</div>
			</div>
	)
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
		deleteSnapshot: (snap_id) => dispatch(deleteSnapshot(snap_id)),
		pinSnapshot: (snap_id) => dispatch(pinSnapshot(snap_id)),
		unpinSnapshot: (snap_id) => dispatch(unpinSnapshot(snap_id))
    }
}

export default connect(null, mapDispatchToProps)(SnapshotSummary)
