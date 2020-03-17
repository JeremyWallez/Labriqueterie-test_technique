import React, { Component } from 'react'

import { connect } from 'react-redux'

class CreateTodoListPage extends Component {
  onChange = (event) => {
    this.props.todoListParam[event.target.name] = event.target.value
    console.log('=> ' + this.props.todoListParam[event.target.name] + ' : ' + event.target.value)
  }

  onSubmit = (event) => {
    if (event.target.name === 'submit') {
      console.log('user is: ' + JSON.stringify(this.props.user))
      const jsonBody = {
        'userId': this.props.user._id,
        'title': this.props.todoListParam.title,
        'description': this.props.todoListParam.description
      }
      console.log('handleClick: jsonBody: ' + JSON.stringify(jsonBody))
      fetch(process.env.REACT_APP_API_URL + 'todolists/create', {
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
            this.props.history.push('/list')
            //console.log('token is' + jsonParsed.token)
          })
        } else {
          console.log('res not OK: ' + JSON.stringify(res))
        }
      })
      .then(error => {
        console.error(error)
      })
    }
  }
  render() {
      return (
        <div className="row">
        <div className="form-holder">
          <h3> Create a Todo List </h3>
          <div className="form-content">
            <div className="form-items">
              <input onChange={this.onChange} className="form-control" type="text" name="title" placeholder={this.props.todoListParam.title} required/>
              <textarea onChange={this.onChange} className="form-control" type="hugetext" name="description" placeholder={this.props.todoListParam.description}/>
              <div className="form-button">
                <button id="submit" onClick={this.onSubmit} name="submit" className="ibtn"> Create </button>
                <button id="cancel" className="ibtn"> Cancel </button>
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
    user: state.user,
    todoListParam: {
      title: 'TodoList title',
      description: 'TodoList description'
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodoListPage)
