const initialState = {
  user: {
    username: '',
    password: '',
    emailAddress: '',
    firstName: '',
    lastName: '',
    authToken: ''
  },
  todolists: []
}

const reducer = (state = initialState, action) => {
  const newState = {...state}
  if (action.type === 'STORE_USER') {
    newState.user = action.value
    console.log('after action.type === STORE_USER: ' + JSON.stringify(newState))
  }
  if (action.type === 'STORE_LISTS') {
    newState.todolists.push(action.value)
    console.log('after action.type === STORE_LISTS: ' + JSON.stringify(newState))
  }
  return newState
}

export default reducer
