import React, { Component } from 'react'

import { connect } from 'react-redux'

import img from "../../images/graphic1.svg"

class SignUpPage extends Component {
  onChange = (event) => {
    this.props.user[event.target.name] = event.target.value
    console.log(this.props.user[event.target.name] + ' = ' + event.target.value)
  }

  onSubmit = (event) => {
    const jsonBody = {
      'username': this.props.user.username,
      'password': this.props.user.password,
      'emailAddress': this.props.user.emailAddress,
      'firstName': this.props.user.firstName,
      'lastName': this.props.user.lastName
    }
    console.log(JSON.stringify(jsonBody))
    fetch(process.env.REACT_APP_API_URL + 'users/register', {
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
        this.props.storeUser(jsonParsed)
      })
    })
    .then(error => {
      console.error(error)
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="website-logo">
          <div className="logo logo-area">
              <img className="logo-size" alt="logo"/>
          </div>
        </div>
        <div className="background-sign-page"></div>
        <div className="row">
          <img className="image-groupe-signin" src={img} alt=""/>
            <div className="form-holder">
                <div className="form-content">
                    <div className="form-items">
                        <h3>Make your life easier with Workinspot</h3>
                        <p>Regroups all your things to do in efficient and optimized todolists</p>
                        <div className="page-links">
                            <a href="signin">Se connecter</a><a href="signup" className="active">S'inscrire</a>
                        </div>
                        {//<form action="#" onSubmit={this.onSubmit}>
                        }
                            <input onChange={this.onChange} className="form-control" type="text" name="firstName" placeholder="First Name" required/>
                            <input onChange={this.onChange} className="form-control" type="text" name="lastName" placeholder="Last Name" required/>
                            <input onChange={this.onChange} className="form-control" type="text" name="username" placeholder="User Name" required/>
                            <input onChange={this.onChange} className="form-control" type="email" name="emailAddress" placeholder="E-mail Address" required/>
                            <input onChange={this.onChange} className="form-control" type="password" name="password" placeholder="Password" required/>
                            <div className="form-button">
                                <button onClick={this.onSubmit} id="submit" className="ibtn">S'inscrire</button>
                            </div>
                        {//</form>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => dispatch({type:'STORE_USER', value:user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
