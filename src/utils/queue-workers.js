const mailWorker = (context) => {
  const { app, payload } = context

  const transport = app.get('mail-transport')

  return transport.sendMail(payload)
}

module.exports = {
  mailWorker,
}
