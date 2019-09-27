import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { fetchSnapshots } from '../../store/actions/snapshotActions'
import moment from 'moment'

class SnapshotDetails extends Component {
    state = {
        isChecked: false
    }

    handleChange = () => { 
        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    render()
    {
        const { snapshot, auth, fetchSnapshots } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        
        if (snapshot) {
            {
            //var image = process.env.PUBLIC_URL + snapshot.image_path;
            // mask = process.env.PUBLIC_URL + snapshot.mask_path;
            var hideStyle = this.state.isChecked ? null : {display: "None"};
            //var img_src = this.state.isChecked ? mask : image;
            var diseases = snapshot.conclusion ? JSON.parse(snapshot.conclusion) : [];
            return (
                <div className="page-layout">
                    <div className="row">
                        <div className="col-xs-6">
                            <table>{ diseases && Object.keys(diseases).map(disease => {
                                return (
                                    <tr key={disease}>
                                        <td>{disease}</td>
                                        <td>{(diseases[disease] * 100).toFixed(2)}</td>
                                    </tr>
                                )
                            })}</table>
                        </div>
                        <div className="col-xs-5">
                            <Link className="link--back" to={'/dashboard'}>👈🏾 To dashboard</Link> 
                            <img className="img--snapshot" src={process.env.PUBLIC_URL + snapshot.image_path} alt=''/>
                            <img className="img--snapshot" src={process.env.PUBLIC_URL + snapshot.mask_path} style={hideStyle}  alt=''/>
                            <p id="p--heatmap">Heatmap</p> 
                            <label className="toggle">
                                <input type="checkbox" onChange={this.handleChange}/>
                                <span className="slider"></span>
                            </label>
                            <p>{moment(new Date(snapshot.created)).calendar()}</p>
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
        fetchSnapshots: () => dispatch(fetchSnapshots())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'snapshots'}
    ])
)(SnapshotDetails)
