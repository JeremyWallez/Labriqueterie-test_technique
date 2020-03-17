import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import SignInPage from '../SignIn/signIn'
import SignUpPage from '../SignUp/signUp'
import HomePage from '../Home/home'
import FrontPage from '../FrontPage/frontPage'
import AuthNavigation from '../Navigation/authNavigation'
import NoAuthNavigation from '../Navigation/noAuthNavigation'
import CreateTodoListPage from '../CreateTodoList/createTodoList'
import TodoListsPage from '../TodoLists/todoLists'
import TasksPage from '../Tasks/tasks'
import CreateTaskPage from '../CreateTask/createTask'

import { connect } from 'react-redux'

class App extends Component {
  componentDidUpdate(prevprops) {
    console.log('componentDidUpdate App: ' + this.props.user.username + ', and ' + prevprops.user.username)
    if (this.props.user.username !== prevprops.user.username) {
      console.log('change in App has been noticied')
      this.forceUpdate()
    }
  }
  render() {
    console.log('CA VA RENDER MAMEN')
    return (
      <Router>
        <div className="App">
        <this.props.navig />

        <Route exact strict path={ROUTES.SIGN_IN} component={SignInPage}/>
        <Route exact strict path={ROUTES.SIGN_UP} component={SignUpPage}/>
        <Route exact strict path={ROUTES.HOME} component={HomePage}/>
        <Route exact strict path={ROUTES.FRONT} component={FrontPage}/>
        <Route exact strict path={ROUTES.CREATE_LIST} component={CreateTodoListPage}/>
        <Route exact strict path={ROUTES.LISTS} component={TodoListsPage}/>
        <Route exact strict path={ROUTES.TASKS} component={TasksPage}/>
        <Route exact strict path={ROUTES.CREATE_TASK} component={CreateTaskPage}/>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps app.js, username is: ' + state.user.username)
  return {
    user: state.user,
    navig: state.user.username !== '' ? AuthNavigation : NoAuthNavigation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
