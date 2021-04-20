const mailFrom = 'hello@treeftly.com'

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

const sendVerification = async (context) => {
  if (process.env.NODE_ENV === 'test') {
    return context
  }

  const { app, result: user, params: { verificationToken } } = context
  const { url } = app.get('mail')
  const mailQueue = app.get('mail-queue')

  const payload = {
    from: mailFrom,
    to: user.email,
    subject: 'Verify email address',
    template: 'verify-mail',
    context: {
      user,
      url: `${url}/verify-email/${verificationToken.token}`,
    },
  }

  mailQueue.push({ app, payload })

  return context
}

const sendResetPassword = async (context) => {
  if (process.env.NODE_ENV === 'test') {
    return context
  }

  const { app, result: user } = context
  const { token, ...userRest } = user
  const { url } = app.get('mail')
  const mailQueue = app.get('mail-queue')

  const payload = {
    from: mailFrom,
    to: user.email,
    subject: 'Reset password',
    template: 'reset-password',
    context: {
      user: userRest,
      url: `${url}/reset-password/${token}`,
    },
  }

  mailQueue.push({ app, payload })

  return { ...context, result: { status: 'success' } }
}

module.exports = {
  appendUserId,
  userOwnedData,
  sendVerification,
  sendResetPassword,
}
