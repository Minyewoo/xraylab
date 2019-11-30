import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createSnapshot} from '../../store/actions/snapshotActions'
import { Redirect } from 'react-router-dom'
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import './CreateSnapshot.css'
import XrayDropzone from "./XrayDropzone";
import { booleanLiteralTypeAnnotation } from '@babel/types';

function buildFileSelector(callback){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');

    fileSelector.onchange = (e) => {
        callback(Array.from(e.target.files));
    }

    return fileSelector;
  }

export class CreateSnapshot extends Component {
    state = {
        images: []
    }

    componentDidMount() {
        this.fileSelector = buildFileSelector(this.handleImages);
    }

    addImage = (image) => {
        const images = this.state.images;

        //const filenames = [];
        //images.map(file => filenames.push(file.name));

        if (!images.includes(image) && images.length < 5)
        {
            images.push(image);
            this.setState({images:  images });
        }
    };

    handleImages = (acceptedFiles) => {
        var files = acceptedFiles;

        if (files.length > 0) files.forEach(file => {
            this.handleImage(file);
        });
    }

    handleImage = (acceptedFile) => {
        var file = acceptedFile;
        const reader = new FileReader();
        const callback = this.addImage;
        const canvas = document.createElement("canvas");
        const maxWidth = 1000;
        const maxHeight = 1000;

        reader.onloadend = function(e)
        {
            const img = new Image();
            const ctx = canvas.getContext("2d");
            const canvasCopy = document.createElement("canvas");
            const copyContext = canvasCopy.getContext("2d");

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
                callback(canvas.toDataURL());
            };

            img.src = reader.result;
        }

        reader.onerror = function (err) {
            console.log(err);
        };
        reader.readAsDataURL(file);
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.click();
    }

    handleImageCancel = (index) => {
        const stateImages = this.state.images;
        stateImages.splice(index, 1);
        this.setState({ images: stateImages });
      };

    handleChange = (e) => {
        this.setState({
            [e.target.id]:  e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.images.length > 0)
        {
            this.props.createSnapshot(this.state)
            this.props.history.push('/dashboard/all')
        }
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        const stateImages = this.state.images;

        const imageCount = stateImages.length;
        var dropzoneClassname = "noone-snap";
        switch(true) {
            case (imageCount === 0): dropzoneClassname = "noone-snap";
                break;
            case (imageCount === 1): dropzoneClassname = "one-snap";
                break;
            case (imageCount >=2 && imageCount < 3): dropzoneClassname = "some-snap";
                break;
            case (imageCount >= 3 && imageCount <= 4): dropzoneClassname = "many-snap";
                break;
            default: dropzoneClassname = "noone-snap";
                break;
        };

        var disabled = imageCount > 0 ? '' : 'disabled';

        const images = stateImages.map( (image, index) => {
            return( 
                <div className="thumb" key={index}>
                    <img className="thumbImage" src={image} onClick={this.handleImageCancel.bind(this, index)} alt="snapshot_preview"/> 
                </div>
            )
        });

        return (
            <div className="page-layout">
                <div className={"row center-xs middle-xs " + dropzoneClassname}>
                    <form className="col-xs-8 col-md-4" onSubmit={this.handleSubmit} >
                        <XrayDropzone onDrop={this.handleImages} onFileSelect={this.handleFileSelect} images={images} styles={dropzoneClassname} disabled={disabled}></XrayDropzone>
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