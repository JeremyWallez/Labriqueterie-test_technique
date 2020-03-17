const express = require('express')
//const jwt = require('utils/jwt') TODO: uncomment after testing is DONE
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const errorHandler = require('./utils/error_handler')
require('rootpath')()


console.log("on est là:")
dotenv.config()
app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send("hello hello")
})

//app.use(jwt()) TODO: uncomment after testing is DONE
app.use('/users', require('./users/user.controller'))
app.use('/todolists', require('./todo_list/todolist.controller'))
app.use('/tasks', require('./todo_list/tasks/task.controller'))

app.listen(process.env.PORT || 8080, () => {
  console.log(`et ici aussi sur port = ${process.env.PORT}`)
})
