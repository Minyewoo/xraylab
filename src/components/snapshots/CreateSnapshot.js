import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createSnapshot} from '../../store/actions/snapshotActions'

export class CreateSnapshot extends Component {
    state = {
        title: '',
        description: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state);
        this.props.createSnapshot(this.state)
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create new snapshot</h5>
                    
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="description">Snapshot description</label>
                        <textarea  id="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSnapshot: (snapshot) => dispatch(createSnapshot(snapshot))
    }
}

export default connect(null, mapDispatchToProps)(CreateSnapshot)
