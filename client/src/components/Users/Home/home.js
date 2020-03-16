import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import './home.css'

class HomeUserPage extends Component {
  retrieveList = (event) => {
    console.log('handleClick: userID: ' + this.props.user._id)
    fetch('http://localhost:8080/todolists/' + this.props.user._id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
    })
    .then(res => {
      //const propsCopy = this.props
      console.log('we are here')
      if (res.ok) {
        res.json()
        .then(jsonParsed => {
          console.log('lists received: ')
          console.log(jsonParsed)
          this.props.storeLists(jsonParsed)
          this.setState({
            user: this.props.user,
            todolists: this.props.todolists
          })
          //this.forceUpdate()
          //console.log('token is' + jsonParsed.token)
        })
      } else {
        console.log('error: ' + res)
      }
    })
    .then(error => {
      console.error(error)
    })
  }
  addList = (event) => {
    const jsonBody = {
      'userId': this.props.user._id,
      'title': 'i am a new list'
    }
    console.log('handleClick: userID bis: ' + jsonBody.userId)
    fetch('http://localhost:8080/todolists/create', {
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
          //console.log('token is' + jsonParsed.token)
        })
      } else {
        console.log('error: ' + res)
      }
    })
    .then(error => {
      console.error(error)
    })
  }

  /*shouldComponentUpdate(nextPros) {
    console.log('test 1 ok')
    if (this.props.todolists !== nextPros.todolists) {
      return true
    }
    return false
  }*/
  render() {
    let list = this.props.todolists.map((el, i) => (
      <li key={i}> {el.title} </li>
    ))
    return (
      <Fragment>
      <div className="homebody"></div>
      <div className="homegrad"></div>
      <div className="homeheader">
        <div>
          My <span> Home Page</span>
        </div>
      </div>
      <div className="homebutton">
        <button onClick={this.retrieveList}> See all your todo lists </button>
        <button onClick={this.addList}> Create a todo list </button>
      </div>
      <div className="homescreen">
        {
          /*{this.props.todolists.map(function(d, idx){
          console.log('hey : ' + d.title)
          console.log('idx is ' + idx)
          console.log('stringified: ' + JSON.stringify(d))
          const obj = JSON.parse(JSON.stringify(d))
          return (<li key={idx}> {obj.title + ' : ???'} </li>)
        })}*/
        }
        {list}
      </div>
      </Fragment>
      )
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps home.js : ' + state.user.username)
  return {
    user: state.user,
    todolists: state.todolists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeLists: (lists) => dispatch({type:'STORE_LISTS', value: lists})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeUserPage)
