import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { fetchSnapshots, updateDescription } from '../../store/actions/snapshotActions'
import moment from 'moment'

class SnapshotDetails extends Component {
    state = {
        isChecked: false,
        description: "",
        saveMode: 'saved',
        pinMode: 'unpinned',
	    bookmarkStyle: 'bookmark_border'
    }

    handleChange = () => { 
        this.setState({
            ...this.state,
            isChecked: !this.state.isChecked
        })
    }

    handleDescriptionChange = (e) => {
        this.setState({
            ...this.state,
            description: e.target.value,
            saveMode: 'unsaved'
        })
    }

    update_description = (snap_id) => {
        this.props.updateDescription(snap_id, this.state.description);
        this.setState({
            ...this.state,
            saveMode: 'saved'
        })
	}

    render()
    {
        const { snapshot, auth, fetchSnapshots, updateDescription } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        
        if (snapshot) {
            {
            //var image = process.env.PUBLIC_URL + snapshot.image_path;
            // mask = process.env.PUBLIC_URL + snapshot.mask_path;
            //var hideStyle = this.state.isChecked ? null : {display: "None"};
            var imageSrc = this.state.isChecked ? process.env.PUBLIC_URL + snapshot.mask_path : process.env.PUBLIC_URL + snapshot.image_path;
            //var img_src = this.state.isChecked ? mask : image;
            var diseases = snapshot.conclusion ? JSON.parse(snapshot.conclusion) : [];
            return (
                <div className="page-layout">
                    <div className="row">
                        <div className="col-xs-6">
                            <table className="details--list">
                                <tr className="details--list__titles">
                                    <td> Disease </td>
                                    <td> Probability </td>
                                </tr>
                                <tr className="details--list__space"></tr>
                                {
                                    diseases && Object.keys(diseases).map(disease => {
                                    var pred = (diseases[disease] * 100).toFixed(2);
                                    if (pred > 60.)
                                    return (
                                        <tr key={disease}>
                                            <td><span className="details--list__highlight">{disease}</span></td>
                                            <td><span className="details--list__highlight">{pred}</span></td>
                                        </tr>
                                    )
                                    else if (pred > 30.)
                                    return (
                                        <tr key={disease}>
                                            <td>{disease}</td>
                                            <td>{pred}</td>
                                        </tr>
                                    )
                                    })
                                }
                            </table>
                        </div>
                        <div className="col-xs-5">
                            {/* <button className="details--snapshot__delete" onClick=''>
						    	<i className="material-icons">delete_outline</i> 
						    </button>
						    <button className="details--snapshot__pin" onClick=''>
						    	<i className="material-icons">{this.state.bookmarkStyle}</i> 
						    </button> */}
                            <Link className="link--back" to={'/dashboard/all'}> <img className="icon" src={process.env.PUBLIC_URL + "/img/ico_back-stroke.svg"} alt=''/> To dashboard</Link> 
                            <img className="img--snapshot" src={imageSrc} alt=''/>
                            <p id="p--heatmap">Heatmap</p> 
                            <label className="toggle">
                                <input type="checkbox" onChange={this.handleChange}/>
                                <span className="slider"></span>
                            </label>
                            <p id="p--time">{moment(new Date(snapshot.created)).calendar()}</p>
                            <p id="p--note">Note:</p>
                            <textarea className="details__note" name="text" onChange={this.handleDescriptionChange}>{snapshot.description}</textarea>
                            <button className={"details__note--save " + this.state.saveMode} onClick={this.update_description.bind(this, snapshot.id)}>Save</button>
                        </div>
                    </div>
                </div>
            )
            }
        } else {
            fetchSnapshots();
            return (
                <div className="container center">
                    <p>Loading project...</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const snapshots = state.snapshot.snapshots;
    const snapshot = snapshots ? snapshots.find((snapshot) => {return snapshot.id == id}) : null;
    return {
        snapshot: snapshot,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSnapshots: () => dispatch(fetchSnapshots()),
        updateDescription: (snap_id, snap_description) => dispatch(updateDescription(snap_id, snap_description))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnapshotDetails)
