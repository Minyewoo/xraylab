import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import './Navbar.css';

const Navbar = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
        <div className="header wrapper fixed--top">
                <Link to='/' className="header__logo">xraylab</Link>
                { links }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);