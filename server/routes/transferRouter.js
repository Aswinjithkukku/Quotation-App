const express = require("express")
const router = express.Router()
const { isAuthenticatedUser } = require("../middlewares/auth.js")
const { createAirports, allAirports, createTransfers, transfer, enquiry, transferBooking } = require("../controllers/transferControllers.js")

// user Routes
router.route('/').get(isAuthenticatedUser,transfer)
router.route('/enquiry').get(isAuthenticatedUser,enquiry)
router.route('/booking/:id').put(isAuthenticatedUser,transferBooking)

// admin routes
router.route('/admin/airports/all').get(isAuthenticatedUser,allAirports)
router.route('/admin/airports/create').post(isAuthenticatedUser,createAirports)
router.route('/admin/create').post(isAuthenticatedUser,createTransfers)

module.exports = router