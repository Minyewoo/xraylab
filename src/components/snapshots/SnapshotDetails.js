import React from 'react'

const SnapshotDetails = (props) => {
    const id = props.match.params.id;
    return (
        <div className="container section snapshot-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Snapshot Title - {id}</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quia? Numquam quidem fugiat cum nam, facilis tempore nihil rerum laboriosam unde dolorum sit voluptatibus repudiandae ab et magni ut repellat?</p>
                </div>
                <div className="card-action gret lighten-4 grey-text">
                    <div>Posted by Minyewoo</div>
                    <div>29th June, 0pm</div>
                </div>
            </div>
        </div>
    )
}

export default SnapshotDetails
