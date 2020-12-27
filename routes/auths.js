import express from 'express'
import User from '../models/User'
import gateway from '../utils/gateway'

const router = express.Router()

router.post('/register', async (req, res) => {
  const {
    email, firstName, lastName, password,
  } = req.body

  try {
    const { id } = await gateway.post('/consumers', { username: email })
    await gateway.post(`/consumers/${email}/basic-auth`, { password, username: email })

    const newUser = await User.create({ firstName, lastName, consumerId: id })
    res.json(newUser.toJSON())
  } catch (err) {
    console.log('err', err?.response)
    console.error(`Error creating user: ${err}`)
    res.status(err?.response?.status)
    res.send(err?.response?.data)
  }
})

module.exports = router
