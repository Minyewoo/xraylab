import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

export class SignUp extends Component {
    state = {
        email: '',
        password: '',
        nickname: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render() {
        const { auth } = this.props;
        if(auth.uid) return <Redirect to='/' />

        return (
            <div className="container">
                <div className="row">
                <form onSubmit={this.handleSubmit} className="white white col s6 push-s3">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="nickname">Nickname</label>
                        <input type="text" id="nickname" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <button className="t-btn up-txt">Sign Up</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
