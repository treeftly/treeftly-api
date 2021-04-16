const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const handlebars = require('express-handlebars')

const appendUserId = (context) => {
  Object.assign(context.data, { userId: context.params.user.id })
  return context
}

const userOwnedData = (context) => {
  const { params, ...rest } = context

  if (params.user && params.user.id) {
    Object.assign(params.query, {
      $or: [
        { userId: { $eq: null } },
        { userId: { $eq: params.user.id } },
      ],
    })
  }

  return { ...rest, params }
}

const sendMail = async (user, config) => {
  const {
    username, password, templates, ...rest
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

  const mailPayload = {
    from: 'hello@treeftly.com',
    to: user.email,
    subject: 'Verify email address',
    template: 'verify-mail',
    context: {
      user,
      url: 'https://treeftly.com/verify?id=some-unique-id',
    },
  }

  try {
    await transport.verify()
    transport.sendMail(mailPayload)
  } catch (err) {
    console.error('Failed to connect to SMTP', err)
  }
}

module.exports = {
  appendUserId,
  userOwnedData,
  sendMail,
}
