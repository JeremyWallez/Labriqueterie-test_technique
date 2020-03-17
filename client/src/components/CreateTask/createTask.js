import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'

class CreateTaskPage extends Component {
  onChange = (event) => {
    this.props.taskParam.name = event.target.value
  }

  onChangeDatePickerStart = (date) => {
    (this.props.taskParam.startDate) = (date)
    console.log('received date: ' + date)
    //this.setState({taskParam.startDate: date})
    this.forceUpdate()
  }

  onChangeDatePickerEnd = (date) => {
    (this.props.taskParam.endDate) = (date)
    console.log('received date: ' + date)
    //this.setState({taskParam.startDate: date})
    this.forceUpdate()
  }

  onSubmit = (event) => {
    const jsonBody = {
      'listId': this.props.current._id,
      taskParams: {
        'name': this.props.taskParam.name,
        'startDate': this.props.taskParam.startDate,
        'endDate': this.props.taskParam.endDate
      }
    }
    console.log('handleClick: jsonBody: ' + JSON.stringify(jsonBody))
      fetch(process.env.REACT_APP_API_URL + 'tasks/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(jsonBody)
    })
    .then(res => {
      console.log('we are here')
      if (res.ok) {
        res.json()
        .then(jsonParsed => {
          console.log(jsonParsed)
          this.props.history.push('/tasks')
        })
      } else {
        console.log('res not OK: ' + JSON.stringify(res))
      }
    })
    .then(error => {
      console.error(error)
    })
  }
  render() {
    if (this.props.user.username === '')
      this.props.history.push('/signin')
    return (
      <div className="row">
      <div className="form-holder">
        <h3> Create a Task </h3>
        <div className="form-content">
          <div className="form-items">
            <input onChange={this.onChange} className="form-control" type="text" name="name" placeholder={this.props.taskParam.name} required/>
            <h3> Choose a starting date (optionnal) </h3>
            <DatePicker onChange={this.onChangeDatePickerStart}selected={this.props.taskParam.startDate}/>
            <h3> Choose an ending date (required) </h3>
            <DatePicker onChange={this.onChangeDatePickerEnd}selected={this.props.taskParam.endDate}/>
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
    current: state.currentList,
    taskParam: {
      name: 'name',
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1)
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskPage)
