import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import AuthNavigation from './AuthNavigation'
import './Auth.css';

export class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const { signinError, auth } = this.props;
        console.log(this.props);
        if(auth.uid) return <Redirect to='/' />

        return (
            <div className="content wrapper">
                <div className="row center-xs">
                    <AuthNavigation signIn={true}/>
                </div>
                <div className="row center-xs">
                    <form className="form--auth col-xs-12 col-md-4" onSubmit={this.handleSubmit}>
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
                        <button className="button--action text--upper"> login </button>
                        <div className="red-text center">
                            {signinError ? <p>{signinError}</p> : null}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);