const express = require('express')
const router = express.Router()
const todoListService = require('./todolist.service')
//routes
router.post('/create', createTodoList)
router.get('/:userId', getAllTodoList)
router.put('/:usedId/:listId', updateTodoList)
router.delete('/:listId', deleteTodoList)

module.exports = router

function createTodoList(req, res, next) {
  console.log('createTodoList called')
  todoListService.create(req.body)
    .then(list => list ? res.json(list) : res.status(400).json({ message: 'Invalid list name'}))
    .catch(error => next(error))
}

function getAllTodoList(req, res, next) {
  console.log('getAll todolist called')
  todoListService.getAll(req.params.userId)
    .then(lists => lists ? res.json(lists) : res.status(500).json({ message: 'Unknown error'}))
    .catch(error => next(error))
}

function updateTodoList(req, res, next) {
  console.log('updateTodoList called')
  todoListService.update(req.params)
    .then(() => res.json({}))
    .catch(err => next(err))
}

function deleteTodoList(req, res, next) {
  console.log('deleteTodoList called: ' + req.params.listId)
  todoListService.delete(req.params.listId)
    .then((idRemoved) => res.json({idRemoved}))
    .catch(err => next(err))
}
