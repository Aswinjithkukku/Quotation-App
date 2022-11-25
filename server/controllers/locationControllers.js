const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Place, Country,Airports } = require("../models")


// create country  (superAdmin) => /api/location/admin/country/create
exports.createCountry = catchAsyncErrors(async(req,res,next) => {
    const { countryName } = req.body

    const country = await Country.create({
        name: countryName
    })

    res.status(201).json({
        success: true,
        country
    })
})

// create place  (superAdmin) => /api/location/admin/place/create
exports.createPlace = catchAsyncErrors(async(req,res,next) => {
    const { placeName, countryName, description } = req.body

    const { id } = await Country.findOne({ where: { name: countryName } })

    const place = await Place.create({
        place: placeName,
        description,
        CountryId: id
    })

    res.status(201).json({
        success: true,
        place
    })
})

// get all countries (superAdmin) => /api/location/admin/country
exports.getCountries = catchAsyncErrors( async(req,res,next) => {

    const countries = await Country.findAll()

    res.status(200).json({
        success: true,
        countries,
    })
})

// get all places (superAdmin) => /api/location/admin/place
exports.getPlaces = catchAsyncErrors( async(req,res,next) => {

    const places = await Place.findAll()

    res.status(200).json({
        success: true,
        places
    })
})
// get all airports  => /api/location/airports
exports.getAirports = catchAsyncErrors( async(req,res,next) => {

    const airport = await Airports.findAll()

    res.status(200).json({
        success: true,
        airport
    })
})


// update country name (superAdmin) => /api/location/admin/country/update/:id
exports.updateCountry = catchAsyncErrors( async(req,res,next) => {
    const params = req.params.id

    const country = await Country.update( req.body, { where: { id:params } } )

    res.status(200).json({
        success: true,
        country
    })
})

// update place name (superAdmin) => /api/location/admin/place/update/:id
exports.updatePlace = catchAsyncErrors( async(req,res,next) => {
    const params = req.params.id

    const place = await Place.update( req.body, { where: { id:params } } )
    console.log(req.body)

    res.status(200).json({
        success: true,
        place
    })
})