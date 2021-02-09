import express from 'express'
import sendMail from '../middlewares/sendMail'
import User from '../models/User'
import gateway from '../utils/gateway'

const router = express.Router()

router.post('/register', async (req, res, next) => {
  const {
    email, firstName, lastName, password,
  } = req.body

  try {
    const { id } = await gateway.post('/consumers', { username: email })
    await gateway.post(`/consumers/${email}/basic-auth`, { password, username: email })

    const newUser = await (await User.create({ firstName, lastName, consumerId: id }))
    res.json(newUser.toJSON())
    next()
  } catch (err) {
    console.error(`Error creating user: ${err}`)
    res.status(err?.response?.status)
    res.send(err?.response?.data)
  }
}, sendMail)

router.post('/login', async (req, res) => {
  res.json({ status: 'ok' })
})

module.exports = router
