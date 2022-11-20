const express = require("express")
const router = express.Router()
const { createCountry, createPlace, getCountries, getPlaces, updateCountry, updatePlace } = require("../controllers/locationControllers")

router.route("/admin/country/create").post(createCountry)
router.route("/admin/place/create").post(createPlace)
router.route("/admin/country").get(getCountries)
router.route("/admin/place").get(getPlaces)
router.route("/admin/country/update/:id").put(updateCountry)
router.route("/admin/place/update/:id").put(updatePlace)

module.exports = router