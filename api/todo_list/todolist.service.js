const db = require('utils/db')
const TodoList = db.TodoList

module.exports = {
  create,
  getAll,
  update,
  delete: _delete
}

async function create({userId, title}) {
  if (!userId || !title) {
    throw "No userId or title provided for: create(todolist)"
  }
  try {
    if (await TodoList.findOne({title})) {
      throw 'List name "' + title + '" is already taken'
    }
    const todoList = new TodoList({userId: userId, title: title})
    await todoList.save()
  } catch (error) {
    throw error
  }
}

async function update({userId, title}) {
  if (!userId || !title) {
    throw "No userId or title provided for: update(todolist)"
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

async function getAll(userId) {
  if (!userId) {
    throw "No userID provided for: getAll(todolist)"
  }
  try {
    return await TodoList.find({userId: userId})
  } catch (error) {
    throw error
  }
}

async function _delete({userId, listId}) {
  if (!userId || !listId) {
    throw "No userId or listId provided for: delete(todolist)"
  }
  try {
    await TodoList.findByIdAndRemove({userId: userId, listId: listId})
  } catch (error) {
    throw error
  }
}
