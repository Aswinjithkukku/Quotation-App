const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  createCountry,
  createPlace,
  getCountries,
  getPlaces,
  updateCountry,
  updatePlace,
  getAirports,
} = require("../controllers/locationControllers");


router.route("/airports").get(getAirports);

router
  .route("/admin/country/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCountry);
router
  .route("/admin/place/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPlace);
router
  .route("/admin/country")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCountries);
router
  .route("/admin/place")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getPlaces);
router
  .route("/admin/country/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCountry);
router
  .route("/admin/place/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePlace);

module.exports = router;
