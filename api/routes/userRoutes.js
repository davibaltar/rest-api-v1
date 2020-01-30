const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const jwt = require('../auth/jwt')


/* These endpoints do not need authentication to access them */
router.post('/signup', controller.signup)
router.post('/login', controller.login)
router.get('/logout', controller.logout)

/* These endpoints need authentication to access them */
router.get('/profile', jwt.verify, controller.profile)


module.exports = router