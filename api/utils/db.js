//const config = require('config.json');
const mongoose = require('mongoose');
console.log('mongoString = ' + process.env.mongoString)
mongoose.connect(process.env.mongoString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
  if (err)
    console.error('error is ' + err + '\n error done')
  else
    console.log("logged to db")
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    TodoList: require('../todo_list/todolist.model')
};
