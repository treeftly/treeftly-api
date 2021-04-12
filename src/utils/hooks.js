const appendUserId = (context) => {
  Object.assign(context.data, { userId: context.params.user.id })
  return context
}

const userOwnedData = (context) => {
  const { params, ...rest } = context

  if (params.user.id) {
    Object.assign(params.query, {
      $or: [
        { userId: { $eq: null } },
        { userId: { $eq: params.user.id } },
      ],
    })
  }

  return { ...rest, params }
}

module.exports = {
  appendUserId,
  userOwnedData,
}
