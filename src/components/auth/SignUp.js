import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import AuthNavigation from './AuthNavigation'
import './Auth.css';

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
        if(auth.uid) return <Redirect to='/dashboard/all' />

        return (
            <div className="page-layout">
                <div className="row center-xs">
                    <AuthNavigation signIn={false}/>
                </div>
                <div className="row center-xs">
                    <form className="form--auth col-md-4" onSubmit={this.handleSubmit}>
                        <div className="form--auth__input-field">
                            <label htmlFor="nickname" className="form--auth__label">
                                Username
                            </label>
                            <input type="text" id="nickname" className="form--auth__input" onChange={this.handleChange} required placeholder=" "/>
                        </div>
                        <div className="form--auth__input-field">
                            <label htmlFor="password" className="form--auth__label">
                                Email
                            </label>
                            <input type="email" id="email" className="form--auth__input" onChange={this.handleChange} required placeholder=" "/>
                        </div>
                        <div className="form--auth__input-field">
                            <label htmlFor="password" className="form--auth__label">
                                Password
                            </label>
                            <input type="password" id="password" className="form--auth__input" onChange={this.handleChange} required placeholder=" "/>
                        </div>
                        <button className="button--action text--upper"> sign up </button>
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
