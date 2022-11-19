const express = require("express")
const router = express.Router()
const { createHotel, bookHotel, getHotels, updateHotel, searchHotels, enquiry, enquiryDetails } = require("../controllers/hotelControllers")

// user Routes
router.route('/search').get(searchHotels)
router.route('/enquiry').get(enquiry)
router.route('/enquiry/:id').get(enquiryDetails)

// superAdminRoutes
router.route('/admin/all').get(getHotels)
// router.route('/create').post(bookHotel)
router.route('/admin/create').post(createHotel)
router.route('/admin/update/:id').put(updateHotel)

module.exports = router