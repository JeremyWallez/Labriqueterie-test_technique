import React, { Component } from 'react'

import { connect } from 'react-redux'

class TodoListsPage extends Component {
  componentDidMount() {
    console.log('TodoListsPage fetch: ' + JSON.stringify(this.props.user))
    fetch(process.env.REACT_APP_API_URL + 'todolists/' + this.props.user._id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
    })
    .then(res => {
      //const propsCopy = this.props
      console.log('we are here: ' + JSON.stringify(res))
      if (res.ok) {
        res.json()
        .then(jsonParsed => {
          console.log('lists received: ')
          console.log(jsonParsed)
          this.props.storeLists(jsonParsed)
          this.setState({
            todolists: this.props.todolists
          })
        })
      } else {
        console.log('error: ' + res)
      }
    })
    .then(error => {
      console.log('error is: ')
      console.error(error)
    })
  }

  onClick = (event) => {
    console.log('hello: ' + event.target.name)
    if (event.target.name === 'delete') {
      //this.props.listIdToRemove = event.target.value
      fetch(process.env.REACT_APP_API_URL + 'todolists/' + event.target.value, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
        mode: 'cors',
      })
      .then(res => {
        //const propsCopy = this.props
        console.log('then res fetch delete list')
        if (res.ok) {
          res.json()
          .then(jsonParsed => {
            console.log('return for delete: ' + jsonParsed)
            console.log('stringified: ' + JSON.stringify(jsonParsed))
            console.log('==> ' + jsonParsed.idRemoved)
            this.props.removeList(jsonParsed.idRemoved)
            this.setState({
              todolists: this.props.todolists
            })
          })
        } else {
          console.log('error: ' + res)
        }
      })
      .then(error => {
        console.log('error is: ')
        console.error(error)
      })
    }
    if (event.target.name === 'create') {
      this.props.history.push('/createlist')
    }
    if (event.target.name === 'goto') {
      console.log('about to store: ' + event.target.value)
      this.props.storeCurrentList(this.props.list[event.target.value])
      this.props.history.push('/tasks')
    }
  }
  render() {
    if (this.props.user.username === '')
      this.props.history.push('/signin')
    if (this.props.list.length <= 0) {
      return (
        <div className="no-list">
          <h2> You don't have any todolist to show </h2>
          <h3> Why don't you <button onClick={this.onClick} name="create" className="pers-color"> create </button> one ? </h3>
        </div>
      )
    }
    else {
    return (
      <div className="todolist-array">
      <h3> All yours todolists </h3>
      <br/>
      <div className="list-type2">
        <ol>
        {this.props.list.map((item, index) => (
          <li key={item.title}>
            <button onClick={this.onClick} name="goto" value={index} className="other-list-button">{item.title}</button>
            <div><button onClick={this.onClick} name="delete" value={item._id} className="list-button"> Delete List </button></div>
          </li>
        ))}
        </ol>
      </div>
      </div>
    )
  }
}
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    list: state.todolists,
    listIdToRemove: 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeLists: (lists) => dispatch({type:'STORE_LISTS', value:lists}),
    removeList: (listId) => dispatch({type:'REMOVE_LIST', value:listId}),
    storeCurrentList: (currentTitle) => dispatch({type:'STORE_CURRENT', value:currentTitle})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListsPage)
