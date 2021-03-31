const appendUserId = (context) => {
  Object.assign(context.data, { userId: context.params.user.id })
  return context
}

module.exports = {
  appendUserId,
}
