const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js")
const { Hotels, HotelPriceDetails,Place,Airports } = require("../models")
// const dayDifference = require('../utils/dayDifference.js')
const dateRange = require('../utils/setDates.js')


//for super admin => /api/hotels/admin/all
exports.getHotels = catchAsyncErrors(async (req,res,next) => {

    const hotels = await Hotels.findAll()

    res.status(200).json({
        success:true,
        hotels
    })
})


// for super admin => /api/hotels/admin/create
exports.createHotel = catchAsyncErrors (async(req,res,next) => {

    const { place, name, description, phone, email, address, stars } = req.body.hotel

    const placeName = await Place.findOne({ where: {place: place}})

    const hotels = await Hotels.create({
        name,
        description,
        phone,
        email,
        address,
        stars,
        PlaceId: placeName.id,
        CountryId: placeName.CountryId
    })
    const { fromDate, toDate, priceOneBr,priceTwoBr,priceThreeBr,priceSixBr,priceEightBr } = req.body.details

    const individuals = dateRange(fromDate,toDate, priceOneBr,priceTwoBr,priceThreeBr,priceSixBr,priceEightBr)
      
    const details = await HotelPriceDetails.create({
        fromDate,
        toDate,
        individuals,
        HotelId: hotels.id
    })
    
    res.status(201).json({
        success: true,
        hotels,
        details
    })

})

// for super admin => /api/hotels/admin/update/:id
exports.updateHotel = catchAsyncErrors( async(req, res, next) => {
    
    const params = req.params.id

    const hotels = await Hotels.update(req.body, { where: { id: params } })

    res.status(200).json({
        success: true,
        hotels
    })
})


// search hotel on the basis of place - for users => /api/hotels/search
exports.searchHotels = catchAsyncErrors(async (req,res,next) => {

    const { placeName } = req.body

    // find the location id
    const location = await Place.findOne({ where: { place: placeName} })

    // find the hotels in that area
    const hotels = await Hotels.findAll({ where: { PlaceId: location.id } })

    res.status(200).json({
        success: true,
        hotels
    })
})

// enquiry for users => /api/hotels/enquiry
exports.enquiry = catchAsyncErrors( async(req,res,next) => {

    const { airportIata } = req.body
    
    const { CountryId } = await Airports.findOne({ where: { iata: airportIata } })

    const hotels = await Hotels.findAll({ where: { CountryId: CountryId } })

    res.status(200).json({
        success: true,
        hotels,
            
    })
})

// enquery rest details users => /api/hotels/enquiry/:id
exports.enquiryDetails = catchAsyncErrors( async(req,res,next) => {
    const params = req.params.id

    const { fromDate, toDate, peoples=0, oneBed=0, twoBed=0, threeBed=0, sixBed=0, eightBed=0 } = req.body

    const details = await HotelPriceDetails.findOne({ where: { HotelId: params } })
    const hotels = await Hotels.findByPk(params)

    const startDate = new Date(fromDate)
    const endDate = new Date(toDate)

    const data = details.individuals.filter((datas) => {
        return new Date(datas.date) >= startDate && new Date(datas.date) <= endDate
    })

    const price = data.map((cash) => (
        (cash.priceOneBedroom * oneBed) + (cash.priceTwoBedroom * twoBed) + (cash.priceThreeBedroom * threeBed) + (cash.priceSixBedroom * sixBed) + (cash.priceEightBedroom * eightBed)
    ))
    const sum = price.reduce((acc,val) => acc + val, 0)
    const amountPerPerson = sum / peoples

    res.status(200).json({
        success: true,
        hotels,
        details,
        data,
        price,
        sumForEnquiry: sum,
        amountPerPerson
    })
})

exports.test = catchAsyncErrors( async(req,res,next) => {
    const { fromDate, toDate, price, individuals } = req.body

    const result = await HotelPriceDetails.create({
        fromDate,
        toDate,
        price,
        individuals
    })
    res.status(201).json({
        success: true,
        result
    })
})
exports.gettest = catchAsyncErrors( async(req,res,next) => {
    const params = req.params.id

    const result = await HotelPriceDetails.findOne({ where: {id: params} })
    
    res.status(201).json({
        success: true,
        result
    })
})
