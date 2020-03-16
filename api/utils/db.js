//const config = require('config.json');
const mongoose = require('mongoose')
mongoose.connect(process.env.mongoString || '', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  if (err) {
    console.error(`Error happened while connecting to mongoDB: ${err.message}`)
    process.exit(1)
  } else {
    console.log('logged to db')
  }
});
mongoose.Promise = global.Promise

module.exports = {
    User: require('../users/user.model'),
    TodoList: require('../todo_list/todolist.model'),
    Task: require('../todo_list/tasks/task.model')
}
