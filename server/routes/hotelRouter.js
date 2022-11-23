const express = require("express")
const router = express.Router()
const { createHotel, bookHotel, getHotels, updateHotel, searchHotels, enquiry, enquiryDetails, test, gettest, alltest } = require("../controllers/hotelControllers")

// user Routes
router.route('/search').get(searchHotels)
router.route('/enquiry').get(enquiry)
router.route('/enquiry/:id').get(enquiryDetails)
router.route('/').post(test)
router.route('/:id').get(gettest)

// superAdminRoutes
router.route('/admin/all').get(getHotels)
// router.route('/create').post(bookHotel)
router.route('/admin/create').post(createHotel)
router.route('/admin/update/:id').put(updateHotel)

module.exports = router