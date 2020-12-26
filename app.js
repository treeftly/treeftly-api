const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fetch = require('axios')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/register', async (req, res) => {
  const { data } = await fetch.get('http://localhost:8001/services')
  console.log(data)
  res.json({ status: "ok" })
})

module.exports = app
