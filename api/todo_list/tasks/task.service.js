const db = require('utils/db')
const Task = db.Task

module.exports = {
  create,
  getAll,
  update,
  delete: _delete
}

async function create({listId, taskParams}) {
  if (!listId || !taskParams) {
    throw "Invalid params for create(Task)"
  }
  try {
    const name = taskParams.name
    if (await Task.findOne({name})) {
      throw 'Task name "' + taskParams.name + '" is already taken'
    }
    const task = new Task({
        listId: listId,
        name: taskParams.name,
        startDate: taskParams.startDate,
        endDate: taskParams.endDate
    })
    await task.save()
    return task
  } catch (error) {
    throw error
  }
}

async function getAll(listId) {
  if (!listId) {
    throw "Invalid params for getAll(Task)"
  }
  try {
    return await Task.find({listId: listId})
  } catch (error) {
    throw error
  }
}

async function update({taskId, taskParams}) {
  if (!taskId) {
    throw "Invalid params for update(Task)"
  }
  try {
    const task = Task.findOne({taskId: taskId})

    if (!task) {
      throw "No task found"
    }
    task.listId = taskParams.listId
    task.name = taskParams.name
    task.startDate = taskParams.startDate
    task.endDate = taskParams.endDate
    task._done = taskParams._done
    await task.save()
  } catch (error) {
    throw error
  }
}

async function _delete(taskId) {
  if (!taskId) {
    throw "Invalid params for delete(Task)"
  }
  try {
    await Task.findByIdAndRemove(taskId)
    return taskId
  } catch (error) {
    throw error
  }
}
