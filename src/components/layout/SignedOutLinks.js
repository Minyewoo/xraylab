import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className="header__nav nav--header">
            {/* <li className="nav--header__item nav__item" id="js-sign-in"><NavLink className="nav--header__link" to='/signup'>Sign up</NavLink></li>
            <li className="nav--header__item nav__item" id="js-sign-out"><NavLink className="nav--header__link" to='/signin'>Sign in</NavLink></li> */}
        </ul>
    )
}

export default SignedOutLinks;