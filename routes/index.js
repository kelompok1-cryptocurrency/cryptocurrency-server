const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller.js')

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.post('/login/google', Controller.googleLogin)

module.exports = router