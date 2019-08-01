import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    const setActive = (el) => {
        el.target.parentNode.querySelector('[state]').removeAttribute('state');
        links.getElementById(el.target.id).setAttribute('state', 'active');
    }
    var links = <ul className="navbar-buttons">
                    <li className="active-buttons" id="btn1" onClick={setActive(this)}><NavLink to='/create'>New snapshot</NavLink></li>
                    <li className="active-buttons" ><a onClick={props.signOut}>Sign out</a></li>
                    <li className="active-buttons" id="btn2" onClick={setActive(this)}><NavLink to='/'><div className='btn btn-floating pink lighten-1'>{props.profile.initials}</div></NavLink></li>
                </ul>;
    return (
        {links}
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);