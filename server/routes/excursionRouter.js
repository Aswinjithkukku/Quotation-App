const express = require("express")
const router = express.Router()
const { createExcursion, allExcursions, enquiry, enquiryDetails } = require("../controllers/excursionControllers")


router.route("/create").post(createExcursion)
router.route("/all").get(allExcursions)
router.route("/enquiry").get(enquiry)
router.route("/enquiry/:id").get(enquiryDetails)


module.exports = router