const db = require('utils/db')
const TodoList = db.TodoList

module.exports = {
  create,
  getAll,
  update,
  delete: _delete
}

async function create({userId, title, description}) {
  if (!userId || !title) {
    throw "Invalid params for create(todolist)"
  }
  try {
    if (await TodoList.findOne({title})) {
      throw 'List name "' + title + '" is already taken'
    }
    const todoList = new TodoList({userId: userId, title: title, description: description})
    await todoList.save()
    return todoList
  } catch (error) {
    throw error
  }
}

async function getAll(userId) {
  if (!userId) {
    throw "Invalid params for getAll(todolist)"
  }
  try {
    return await TodoList.find({userId: userId})
  } catch (error) {
    throw error
  }
}

async function update({userId, title}) {
  if (!userId || !title) {
    throw "Invalid params for update(todolist)"
  }
  try {
    const todoList = TodoList.findOne({userId: userId, ttle: title})

    if (!todoList) {
      throw "No todolist found for userId " + userId + " with title " + title
    }
    todoList.title = title
    await todoList.save()
  } catch (error) {
    throw error
  }
}

async function _delete(listId) {
  if (!listId) {
    throw "Invalid params for delete(todolist)"
  }
  try {
    console.log('awaiting remove of list')
    await TodoList.findByIdAndRemove(listId)
    return listId
  } catch (error) {
    throw error
  }
}
