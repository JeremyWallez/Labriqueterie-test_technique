import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

class NoAuthNavigation extends Component {
  render() {
    return (
    <div className="navigation">
    <div className="container-fluid-navigation-bar">
      <div className="website-logo">
        <div className="logo logo-area">
          <img alt="logo" className="logo-size"/>
        </div>
      </div>
      <ul>
        <li className="profil">
          <Link to={ROUTES.SIGN_UP}>No account ? Register now</Link>
        </li>
        <li className="profil">
          <Link to={ROUTES.SIGN_IN}>Already Member ? Login</Link>
        </li>
          {
          //<li>
          //<SignOutButton />
          //</li>
          }
      </ul>
    </div>
    </div>
  )}
}

export default NoAuthNavigation
