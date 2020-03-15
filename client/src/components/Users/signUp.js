import React, { Component, Fragment } from 'react'

import './signIn.css'

class SignUpPage extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    const jsonBody = {
      'username': this.state.name,
      'password': this.state.password,
      'emailAddress': this.state.email,
      'firstName': this.state.firstname,
      'lastName': this.state.lastname
    }
    fetch('http://localhost:8080/users/register', {
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
      res.json()
      .then(jsonParsed => {
        console.log(jsonParsed)
      })
    })
    .then(error => {
      console.error(error)
    })
  }

  goToSignIn = () => {
    this.props.history.push('/signin')
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
          <input type="text" placeholder="Username" onChange={this.handleChange} name="name"/><br/>
          <input type="password" placeholder="Password" onChange={this.handleChange} name="password"/><br/>
          <input type="text2" placeholder="Email" onChange={this.handleChange} name="email"/><br/>
          <input type="text2" placeholder="First name" onChange={this.handleChange} name="firstname"/><br/>
          <input type="text2" placeholder="Last name" onChange={this.handleChange} name="lastname"/><br/>
          <input type="button" onClick={this.handleSubmit} value="Register"/>
          <input type="button" onClick={this.goToSignIn} value="Log to your account"/>
      </div>
      </Fragment>
  )}
}

export default SignUpPage
