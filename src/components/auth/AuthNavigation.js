import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Auth.css"

class AuthNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signIn: props.signIn
        }
     }

    render() {
        return (
            <ul className="nav--auth col-xs-12">
                <li className="nav--auth__item nav__item" state={!this.state.signIn ? "current" : null}><NavLink className="nav--auth__link" to="/signup">Sign up</NavLink></li>
                <li className="nav--auth__item nav__item" state={this.state.signIn ? "current" : null}><NavLink className="nav--auth__link" to='/signin'>Login</NavLink></li>
            </ul>
        ) 
    }
}

export default AuthNavigation   