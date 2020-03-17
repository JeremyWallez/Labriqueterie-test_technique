import  React, { Component } from 'react'

import DatePicker from 'react-datepicker'

import { connect } from 'react-redux'

class TasksPage extends Component {
  checkArray = (toCheck) => {
    console.log(toCheck)
    toCheck.forEach(function(item, index) {
      let hasIt = false
      for (let i = 0; i < this.props.tasks.length; i++) {
        if (this.props.tasks[i].name === item.name) {
          hasIt = true
          console.log('found an item we already had')
        }
      }
      if (hasIt === false) {
        this.props.tasks.push(item)
        console.log('item added')
      }
    })
}

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + 'tasks/' + this.props.current._id, {
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
          this.props.storeTasks(jsonParsed)
          //this.props.storeLists(jsonParsed)
          //this.checkArray(jsonParsed)
          this.forceUpdate()
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
    if (event.target.name === 'add') {
      this.props.history.push('/createtask')
    }
    if (event.target.name === 'update') {

    }

  }
  render() {
    if (this.props.user.username === '') {
      this.props.history.push('/signin')
    }
    console.log('==> ' + this.props.current.title)
    console.log('and => ' + JSON.stringify(this.props.list))
    return (
      <div className="todolist-array">
        <h3> Tasks for {this.props.current.title} </h3>
        <div className="list-type2">
          <ol>
            {this.props.tasks.map((item, index) => (
              <li key={item.name}>
                <button className="other-list-button"> {item.name} </button>
                <DatePicker selected={new Date(item.startDate)}/><p> Started date </p>
                <DatePicker selected={new Date(item.endDate)}/><p> Delivery date </p>
                <p> Click to mark it done   <input type="checkbox" onClick={this.onCLock} name="update" id="box-1"/> </p>
              </li>
            ))}
          </ol>
        </div>
        <button onClick={this.onClick} name="add" className="list-button"> Add a Task </button>
        <button onClick={this.onClick} name="add" className="list-button"> Save changes </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    list: state.todolists,
    current: state.currentList,
    tasks: state.tasks,
    toUpdate: []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeTasks: (tasks) => dispatch({type:'STORE_TASKS', value:tasks})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage)
