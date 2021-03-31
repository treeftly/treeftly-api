const compress = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const morgan = require('morgan')

const logger = require('./logger')
const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')
const authentication = require('./authentication')
const sequelize = require('./sequelize')

const app = express(feathers())

// Load app configuration
app.configure(configuration())
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false,
}))
app.use(cors())
app.use(compress())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set up Plugins and providers
app.configure(express.rest())

app.configure(sequelize)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
app.configure(authentication)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound({ html: false }))
app.use(express.errorHandler({ logger, html: false }))

app.hooks(appHooks)

module.exports = app
