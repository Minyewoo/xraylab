import React, { Component } from 'react'
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import Dropzone from 'react-dropzone';
import './CreateSnapshot.css'

const DashedArea = styled.div`
    --containerWidth: ${props => props.containerWidth + "px"};
    --containerHeight: ${props => props.containerHeight + "px"};

    --dashSizeVertical: ${props => props.containerHeight / ~~(props.containerHeight / (props.dashSize * 2)) + "px"};
    --dashSizeHorizontal: ${props => props.containerWidth / ~~(props.containerWidth / (props.dashSize * 2)) + "px"};

    --dashColor: #151515;

    height: var(--containerHeight);
    width: var(--containerWidth);

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
    background-size: var(--dashSizeHorizontal) 4px, 
                    var(--dashSizeHorizontal) 4px, 
                    4px var(--dashSizeVertical),
                    4px var(--dashSizeVertical);

    box-sizing: border-box;
`;

 class XrayDropzone extends Component {

    render() {
        const {onDrop, onFileSelect, images, styles, disabled} = this.props;
        return (
            <Dropzone onDrop={onDrop} accept="image/jpeg, image/png" noClick={true}>
                            {({getRootProps, getInputProps}) => (
                                <React.Fragment>
                                    <ReactResizeDetector handleWidth handleHeight>
                                      {({ width, height }) => (
                                        <DashedArea className="test1" {...getRootProps({containerWidth: width, containerHeight: width, dashSize:40})}>
                                            <img className="img--atch" src={process.env.PUBLIC_URL + "/img/area-img.svg"} alt=''/>
                                            <aside className="thumbsContainer">
                                                {images}
                                            </aside>
                                            <input className="test4" {...getInputProps()} />
                                            <p className="dialog--atch">
                                                Drag 'n' drop some files here
                                            </p>
                                            <p className="dialog--atch">
                                                Or <span className="dialog--browse" onClick={onFileSelect}>choose your files</span>
                                            </p>
                                        </DashedArea>
                                      )}
                                    </ReactResizeDetector>
                                    <div className="input-field test6">
                                        <button className="button--action" disabled={disabled}>Create</button>
                                    </div>
                                </React.Fragment>
                            )}
            </Dropzone>
        )
    }

}

export default XrayDropzone;