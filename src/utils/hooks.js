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

const sendMail = async (context) => {
  if (process.env.NODE_ENV === 'test') {
    return context
  }

  const { app, result: user, verificationToken } = context
  const { url } = app.get('mail')
  const mailQueue = app.get('mail-queue')

  const payload = {
    from: 'hello@treeftly.com',
    to: user.email,
    subject: 'Verify email address',
    template: 'verify-mail',
    context: {
      user,
      url: `${url}/verify-email?token=${verificationToken.token}`,
    },
  }

  mailQueue.push({ app, payload })

  return context
}

module.exports = {
  appendUserId,
  userOwnedData,
  sendMail,
}
