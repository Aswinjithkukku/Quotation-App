const express = require("express")
const router = express.Router()
const { loginUser,registerUser, allUsers, logoutUser } = require('../controllers/userControllers.js')

router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/register').post(registerUser)
router.route('/admin/all').get(allUsers)

module.exports = router