const express = require('express')
const router = express.Router()

const Controller = require('../controllers/controller.js')
const {authenticate} = require("../middlewares/authentication.js")

router.post('/register', Controller.userRegister)
router.post('/login', Controller.userLogin)
router.post('/login/google', Controller.googleLogin)
router.get('/home', authenticate, Controller.home)


module.exports = router