import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <ul className="header__nav nav--header">
            <li className="nav--header__item nav__item"><NavLink className="nav--header__link" to='/create'>New snapshot</NavLink></li>
            <li className="nav--header__item nav__item"><NavLink className="nav--header__link" to='/dashboard'>Dashboard</NavLink></li>
            <li className="nav--header__item nav__item"><a className="nav--header__link" onClick={props.signOut}>Sign out</a></li>
            <li className="nav--header__item nav__item nav--header__userpic"> {props.profile.initials} </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);