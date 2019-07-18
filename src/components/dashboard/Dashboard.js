import React, {Component} from 'react'
import SnapshotList from '../snapshots/SnapshotList'
import { connect } from 'react-redux'

class Dashboard extends Component {
    render() {
        //console.log(this.props)
        const { snapshots } = this.props
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <SnapshotList snapshots={snapshots}/>
                    </div>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        snapshots: state.snapshot.snapshots
    }
}

export default connect(mapStateToProps)(Dashboard);