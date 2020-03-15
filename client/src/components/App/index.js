import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import SignInPage from '../Users/signIn'
import SignUpPage from '../Users/signUp'
import HomeUserPage from '../Users/Home/home'

import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Route exact strict path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route exact strict path={ROUTES.SIGN_UP} component={SignUpPage}/>
        <Route exact strict path={ROUTES.USER} render = {
          () => {
            console.log('before render username is: ' + this.props.user.username)
            return (this.props.user.username !== '' ? ( <HomeUserPage/> ) : ( <Redirect to="/signin" />))
          }
        }/>
          <Route path = "/" exact strict render = {
              () => {
                return (<h1> Welcome to the jungle </h1>)
              }
          }/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps app.js, username is: ' + state.user.username)
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
