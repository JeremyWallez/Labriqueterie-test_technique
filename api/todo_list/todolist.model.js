const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'none'
  }
})

module.exports = mongoose.model('TodoList', schema)
