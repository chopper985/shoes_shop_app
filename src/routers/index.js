const express = require('express')
const UserRouter = require('./user.route')

const router = express.Router()

router.use('/user', UserRouter)
router.get('/', (req, res) => res.status(200).send('Welcome to PTSHIP v1'))

module.exports = router