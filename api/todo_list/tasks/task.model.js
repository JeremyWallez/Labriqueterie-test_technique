const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  listId: {
    type: String,
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  _done: {
    type: Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Task', schema)
