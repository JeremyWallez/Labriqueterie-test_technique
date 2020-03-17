const initialState = {
  user: {
    username: '',
    password: '',
    emailAddress: '',
    firstName: '',
    lastName: '',
    authToken: ''
  },
  todolists: [],
  tasks: [],
  currentList: ''
}

const reducer = (state = initialState, action) => {
  const newState = {...state}
  if (action.type === 'STORE_USER') {
    newState.user = action.value
  }
  if (action.type === 'STORE_LISTS') {
    action.value.forEach(function(item, index) {
      let hasIt = false
      for (let i = 0; i < newState.todolists.length; i++) {
        if (newState.todolists[i].title === item.title) {
          console.log('found an existring ENTRY')
          hasIt = true
        }
      }
      if (hasIt === false) {
        newState.todolists.push(item)
        console.log('item pushed')
      } else {
        console.log('item skipped')
      }
    })
  }
  if (action.type === 'REMOVE_LIST') {
    for (let i = 0; i < newState.todolists.length; i++) {
      if (newState.todolists[i]._id === action.value) {
        newState.todolists.splice(i, 1)
        console.log('an element as been removed at pos ' + i)
      } else {
        console.log(newState.todolists[i]._id + ' !== ' + action.value)
      }
      console.log('turn = ' + i)
    }
  }
  if (action.type === 'STORE_CURRENT') {
    newState.currentList = action.value
  }
  if (action.type === 'STORE_TASKS') {
    if (newState.tasks.length > 0 && (action.value.listId !== newState.tasks[0].listId)) {
      newState.tasks.length = 0
      newState.tasks = action.value
    }
    else {
      action.value.forEach(function(item, idx) {
        let hasIt = false
        for (let i = 0; i < newState.tasks.length; i++) {
          if (newState.tasks[i].name === item.name) {
            hasIt = true
          }
        }
        if (hasIt === false) {
          newState.tasks.push(item)
          console.log('item pushed')
        } else {
          console.log('item skipped')
        }
      })
    }
  }

  console.log('on a fini le reducer avec action = ' + action.type)
  console.log('newState is now: ' + JSON.stringify(newState))
  return newState
}

export default reducer
