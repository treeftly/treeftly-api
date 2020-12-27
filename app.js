import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { Sequelize } from 'sequelize'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import { DATABASE } from './configs'

const { USERNAME, PASSWORD, NAME } = DATABASE
const sequelize = new Sequelize(`postgres://${USERNAME}:${PASSWORD}@localhost:5432/${NAME}`)

const app = express()

app.use(logger('short'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)

sequelize.authenticate()
  .then(() => {
    console.info('Successfully connected to the database')
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`)
  })

module.exports = app
