const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  createHotel,
  getHotels,
  updateHotel,
  searchHotels,
  enquiry,
  enquiryDetails,
  hotelBooking,
  updateIndividuals,
  allHotelbookings,
  allDetails,
} = require("../controllers/hotelControllers");

// user Routes
router.route("/search").get(isAuthenticatedUser, searchHotels);
router.route("/enquiry").post(enquiry);
router.route("/enquiry/:id").get(isAuthenticatedUser, enquiryDetails);
router.route("/booking/:id").put(isAuthenticatedUser, hotelBooking);

// superAdminRoutes
router.route("/admin/all").get(getHotels);
router.route("/admin/bookings/all").get(allHotelbookings);
router.route("/admin/details/all").get(allDetails);
router.route("/admin/create").post(createHotel);
router.route("/admin/update/:id").put(updateHotel);
router.route("/admin/updateIndividuals/:id").put(updateIndividuals);

module.exports = router;
