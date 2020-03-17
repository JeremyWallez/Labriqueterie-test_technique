import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

import './navigation.css'

class AuthNavigation extends Component {

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
      <li className="application">
        <Link name="getList" to={ROUTES.LISTS}>My TodoLists</Link>
      </li>
      <li className="workflows">
        <Link name="createList" to={ROUTES.CREATE_LIST}>Create a List</Link>
      </li>
      <li className="team">
        <Link to={ROUTES.TASKS}>Ma team</Link>
      </li>
      <li className="profil">
        <Link to={ROUTES.TASKS}>Mon Profil</Link>
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

export default AuthNavigation
