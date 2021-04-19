const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const handlebars = require('express-handlebars')

module.exports = (app) => {
  const config = app.get('mail')

  const {
    username, password, templates, url, ...rest
  } = config

  const transport = nodemailer.createTransport({
    ...rest,
    auth: {
      user: username,
      pass: password,
    },
  })

  const viewEngine = handlebars.create({
    partialsDir: 'partials/',
    defaultLayout: false,
  })

  transport.use('compile', hbs({ viewEngine, viewPath: templates, extName: '.html' }))

  app.set('mail-transport', transport)
}
