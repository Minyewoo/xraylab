import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createSnapshot} from '../../store/actions/snapshotActions'
import { Redirect } from 'react-router-dom'

export class CreateSnapshot extends Component {
    state = {
        conclusion: '',
        image: '',
        mask: '',
    }

    callback = (key, value) => {
        this.setState({ [key]:  value });
    };

    handleImage = (e) => {
        var file = e.target.files[0];
        var stateKey = e.target.id;
        var reader = new FileReader();
        var cb = this.callback;
        var canvas = document.createElement("canvas");
        var maxWidth = 200;
        var maxHeight = 200;

        reader.onloadend = function(e)
        {
            var img = new Image();
            var ctx = canvas.getContext("2d");
            var canvasCopy = document.createElement("canvas");
            var copyContext = canvasCopy.getContext("2d");

            img.onload = function()
            {
                var ratio = 1;

                if(img.width > maxWidth)
                    ratio = maxWidth / img.width;
                else if(img.height > maxHeight)
                    ratio = maxHeight / img.height;

                canvasCopy.width = img.width;
                canvasCopy.height = img.height;
                copyContext.drawImage(img, 0, 0);

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
                cb(stateKey, canvas.toDataURL());
            };

            img.src = reader.result;
        }

        reader.onerror = function (err) {
            console.log(err);
        };

        reader.readAsDataURL(file);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]:  e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createSnapshot(this.state)
        this.props.history.push('/dashboard')
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />

        return (
            <div className="container">
                <div className="row">
                <form onSubmit={this.handleSubmit} className="white col s6 push-s3">
                    <h5 className="grey-text text-darken-3">Create new snapshot</h5>

                    <div className="input-field">
                        <label htmlFor="image">Image</label>
                        <input type="file" id="image" onChange={this.handleImage}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="mask">Mask</label>
                        <input type="file" id="mask" onChange={this.handleImage}/>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="conclusion">Snapshot conclusion</label>
                        <textarea  id="conclusion" className="materialize-textarea" onChange={this.handleChange}></textarea>
                    </div>

                    <div className="input-field">
                        <button className="t-btn up-txt">Create</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSnapshot: (snapshot) => dispatch(createSnapshot(snapshot))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSnapshot)