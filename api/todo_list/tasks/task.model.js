const mongoose = require('mongoose')

const Schema = moongoose.Schema;

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
  }
})

module.exports = moongoose.model('Task', schema)
