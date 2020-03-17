import React, { Component } from 'react'

import { connect } from 'react-redux'

import img from "../../images/graphic1.svg"

class SignInPage extends Component {
  onChange = (event) => {
    this.props.user[event.target.name] = event.target.value
  }
  onSubmit = (event) => {
    const jsonBody = {
      'username': this.props.user.username,
      'password': this.props.user.password
    }
    console.log(JSON.stringify(jsonBody))
    fetch(process.env.REACT_APP_API_URL + 'users/authenticate', {
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
          this.props.storeUpdatedUser(jsonParsed)
          this.props.history.push('/home')
        })
      } else {
        console.log('error: ' + res)
      }
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
              <img alt="logo" className="logo-size"/>
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
                            <a href="signin" className="active">Se connecter</a><a href="signup">S'inscrire</a>
                        </div>
                        {//<form action="#" onSubmit={this.onSubmit} className="form_connexion">
                        }
                            <input onChange={this.onChange} id="login_username" className="form-control" type="text" name="username" placeholder="Username" required/>
                            <input onChange={this.onChange} id="login_password" className="form-control" type="password" name="password" placeholder="password" required/>
                            <div className="form-button">
                                <button id="submit" onClick={this.onSubmit} className="ibtn">Se connecter</button>
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

const mapDispatchToProps= (dispatch) => {
  return {
    storeUpdatedUser: (user) => dispatch({type: 'STORE_USER', value: user})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage)
