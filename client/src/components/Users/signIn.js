import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import './signIn.css'

class SignInPage extends Component {

  handleChange = (event) => {
    this.props.user[event.target.name] = event.target.value
  }

  handleSubmit = () => {
    const jsonBody = {
      'username': this.props.user.username,
      'password': this.props.user.password
    }
console.log(jsonBody)
    fetch('http://localhost:8080/users/authenticate', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(jsonBody)
    })
    .then(res => {
      //const propsCopy = this.props
      console.log('we are here')
      if (res.ok) {
        res.json()
        .then(jsonParsed => {
          console.log(jsonParsed)
          console.log('token is' + jsonParsed.token)
          this.props.storeUser(jsonParsed)
          this.props.history.push('/home/user')
        })
      } else {
        console.log('error: ' + res)
      }
    })
    .then(error => {
      console.error(error)
    })
  }

  goToSignUp = () => {
    this.props.history.push('/signup')
  }
  render() {
    return (
      <Fragment>
      <div className="body"></div>
      <div className="grad"></div>
      <div className="header">
        <div>My<span>TodoList</span></div>
      </div>
      <br/>
      <div className="login">
  				<input type="text" placeholder="username" onChange={this.handleChange} name="username"/><br/>
  				<input type="password" placeholder="password" onChange={this.handleChange} name="password"/><br/>
          <input type="button" onClick={this.handleSubmit} value="Login"/>
          <input type="button" onClick={this.goToSignUp} value="Create an account"/>
  		</div>
      </Fragment>

  )}
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps signIn.js :' + state.user.username)
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => dispatch({type:'STORE_USER', value:user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)
