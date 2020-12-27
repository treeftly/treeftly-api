import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import usersRouter from './routes/users'
import authsRouter from './routes/auths'
import sequelize from './utils/db'
import User from './models/User'

const app = express()

app.use(logger('short'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', usersRouter)
app.use('/auth', authsRouter)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

sequelize.authenticate()
  .then(async () => {
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ force: true })
    }

    console.info('Successfully connected database!')
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`)
  })

module.exports = app
