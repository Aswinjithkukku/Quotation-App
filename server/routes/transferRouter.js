const express = require("express")
const router = express.Router()
const { createAirports, allAirports, createTransfers, transfer, enquiry } = require("../controllers/transferControllers.js")

// user Routes
router.route('/').get(transfer)
router.route('/enquiry').get(enquiry)

// admin routes
router.route('/admin/airports/all').get(allAirports)
router.route('/admin/airports/create').post(createAirports)
router.route('/admin/create').post(createTransfers)

module.exports = router