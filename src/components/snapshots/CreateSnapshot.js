import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createSnapshot} from '../../store/actions/snapshotActions'
import { Redirect } from 'react-router-dom'
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import './CreateSnapshot.css'

const DashedArea = styled.div`
    --containerWidth: ${props => props.containerWidth + "px"};
    // --containerHeight: ${props => (props.containerHeight -78) + "px"};
    --containerHeight: ${props => (props.containerwidth) + "px"};
    // --dashSizeVertical: ${props => props.containerHeight / ~~(props.containerHeight / (props.dashSize * 2)) + "px"};
    --dashSizeVertical: ${props => props.containerWidth / ~~(props.containerWidth / (props.dashSize * 2)) + "px"};
    --dashSizeHorizontal: ${props => props.containerWidth / ~~(props.containerWidth / (props.dashSize * 2)) + "px"};
    --dashColor: #151515;
    
    // padding: 0 0 32px 0;
    height: var(--containerWidth);
    box-sizing: border-box;
    background-image: repeating-linear-gradient(
            to right,
            var(--dashColor) 0%,
            var(--dashColor) 25%,
            transparent 25%,
            transparent 75%,
            var(--dashColor) 75%,
            var(--dashColor) 100%
        ),
        repeating-linear-gradient(
            to right,
            var(--dashColor) 0%,
            var(--dashColor) 25%,
            transparent 25%,
            transparent 75%,
            var(--dashColor) 75%,
            var(--dashColor) 100%
        ),
        repeating-linear-gradient(
            to bottom,
            var(--dashColor) 0%,
            var(--dashColor) 25%,
            transparent 25%,
            transparent 75%,
            var(--dashColor) 75%,
            var(--dashColor) 100%
        ),
        repeating-linear-gradient(
            to bottom,
            var(--dashColor) 0%,
            var(--dashColor) 25%,
            transparent 25%,
            transparent 75%,
            var(--dashColor) 75%,
            var(--dashColor) 100%
        );
    background-position: left top, left bottom, left top, right top;
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-size: var(--dashSizeHorizontal) 4px, var(--dashSizeHorizontal) 4px, 4px var(--dashSizeVertical),
      4px var(--dashSizeVertical);
`;

export class CreateSnapshot extends Component {
    state = {
        images: []
    }

    addImage = (image) => {
        const images = this.state.images;

        //const filenames = [];
        //images.map(file => filenames.push(file.name));

        if (!images.includes(image))
        {
            images.push(image);
            this.setState({images:  images });
        }
    };

    handleImages = (acceptedFiles) => {
        //var file = e.target.files[0];
        //const stateKey = "image";
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

        acceptedFiles.forEach(file => reader.readAsDataURL(file))
        //reader.readAsDataURL(file);
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
        this.props.createSnapshot(this.state)
        this.props.history.push('/dashboard')
    }

    render() {
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        const stateImages = this.state.images;
        const images = stateImages.map( (image, index) => {
            return( 
                <div className="thumb" key={index}>
                    <img className="thumbImage" src={image} onClick={this.handleImageCancel.bind(this, index)} alt="snapshot_preview"/> 
                </div>
            )
        });

        return (
            <div class="page-layout">
                <div class="row center-xs middle-xs">
                    <form className="col-xs-8 col-md-4" onSubmit={this.handleSubmit} >
                        <Dropzone onDrop={this.handleImages} accept="image/jpeg, image/png" noClick={true}>
                            {({getRootProps, getInputProps}) => (
                                <section className="">
                                    <ReactResizeDetector handleWidth handleHeight>
                                      {({ width, height }) => (
                                        <DashedArea {...getRootProps({containerWidth: width, containerHeight: height, dashSize:40})}>
                                            <img className="img--atch" src={process.env.PUBLIC_URL + "/img/area-img.png"} alt=''/>
                                            <aside className="thumbsContainer">
                                                {images}
                                            </aside>
                                            <input {...getInputProps()} />
                                            <p className="dialog--atch">
                                                Drag 'n' drop some files here
                                            </p>
                                            <p className="dialog--atch">
                                                {width} x {height}
                                            </p>
                                        </DashedArea>
                                      )}
                                    </ReactResizeDetector>
                                    <div className="input-field">
                                        <button className="t-btn up-txt">Create</button>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
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