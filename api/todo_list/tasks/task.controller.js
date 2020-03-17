const express = require('express')
const router = express.Router()
const taskService = require('./task.service')

router.post('/create', createTask)
router.get('/:listId', getAllTask)
router.put('/:taskId', updateTask)
router.delete('/:taskId', deleteTask)

module.exports = router

function createTask(req, res, next) {
  console.log('createTask called: ' + JSON.stringify(req.params.listId))
  taskService.create(req.body)
    .then(task => task ? res.json(task) : res.status(400).json({ message: 'Invalid task name'}))
    .catch(error => next(error))
}

function getAllTask(req, res, next) {
  console.log('getAllTask called')
  taskService.getAll(req.params.listId)
    .then(tasks => tasks ? res.json(tasks) : res.status(500).hson({ message: 'Unknown error'}))
    .catch(error => next(error))
}

function updateTask(req, res, next) {
  console.log('updateTask called')
  taskService.update(req.params)
    .then(() => res.json({}))
    .catch(error => next(error))
}

function deleteTask(req, res, next) {
  console.log('deleteTask called')
  taskService.delete(req.params.taskId)
    .then((idRemoved) => res.json({idRemoved}))
    .catch(error => next(err))
}
