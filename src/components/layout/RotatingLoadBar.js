import React from 'react'
import "./RotatingLoadBar.css"
const RotatingLoadBar = () => {
    return (
        <div className="row">
            <div className="col s3 push-s6">
                <div className="load-bar rotating"></div>
            </div>
        </div>
    )
}

export default RotatingLoadBar
