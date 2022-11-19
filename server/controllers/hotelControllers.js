const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js")
const { Hotels, HotelDetails,Place,Airports } = require("../models")
const dayDifference = require('../utils/dayDifference.js')


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

    const { place, name, description, phone, email, address, hotel_type } = req.body.hotel

    const placeName = await Place.findOne({ where: {place: place}})

    const hotels = await Hotels.create({
        name,
        description,
        phone,
        email,
        address,
        hotel_type,
        PlaceId: placeName.id,
        CountryId: placeName.CountryId
    })
    const { fromDate, toDate, checkinTime, checkoutTime, oneBr, twoBr, threeBr, sixBr, eightBr,basicOneBr, basicTwoBr, basicThreeBr, basicSixBr,basicEightBr} = req.body.hoteldetails
    const details = await HotelDetails.create({
        fromDate,
        toDate,
        checkinTime,
        checkoutTime,
        oneBr,
        twoBr,
        threeBr,
        sixBr,
        eightBr,
        basicOneBr,
        basicTwoBr,
        basicThreeBr,
        basicSixBr,
        basicEightBr,
        HotelId: hotels.id
    })

    res.status(201).json({
        success: true,
        hotels,
        details
    })

})

// for super admin => /api/hotels/admin/update
exports.updateHotel = catchAsyncErrors( async(req, res, next) => {
    
    const params = req.params.id

    const newHotelDetails = {
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        checkinTime: req.body.checkinTime,
        checkoutTime: req.body.checkoutTime,
        oneBr: req.body.oneBr,
        twoBr: req.body.twoBr,
        threeBr: req.body.threeBr,
        sixBr: req.body.sixBr,
        eightBr: req.body.eightBr,
        basicOneBr: req.body.oneBr,
        basicTwoBr: req.body.twoBr,
        basicThreeBr: req.body.threeBr,
        basicSixBr: req.body.sixBr,
        basicEightBr: req.body.eightBr,
    }

    const hotels = await HotelDetails.findByPk(params)
    hotels.set(newHotelDetails)

    const result = await hotels.save()

    res.status(200).json({
        success: true,
        result
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

// enquery rest details users => /api/hotelsa/enquiry/:id
exports.enquiryDetails = catchAsyncErrors( async(req,res,next) => {
    const params = req.params.id

    const { person = 0, oneBr = 0, twoBr = 0, threeBr = 0, sixBr = 0, eightBr = 0, fromDate, toDate } = req.body

    const details = await HotelDetails.findOne({ where: { HotelId: params } })
    const hotels = await Hotels.findByPk(params)

    const startDate = new Date(fromDate)
    const endDate = new Date(toDate)

    let diff = 0
    let diff2 = 0

    let sumPerDay = (oneBr * details.oneBr) + (twoBr * details.twoBr) + (threeBr * details.threeBr) + (sixBr * details.sixBr) + (eightBr * details.eightBr)
    let basicSumPerDay = (oneBr * details.basicOneBr) + (twoBr * details.basicTwoBr) + (threeBr * details.basicThreeBr) + (sixBr * details.basicSixBr) + (eightBr * details.basicEightBr)
    let totalSum = 0
    let amountPerDay = 0
    // conditiions
    if(startDate >= details.fromDate && endDate <= details.toDate) {
        diff = dayDifference(startDate,endDate)
        totalSum = sumPerDay * diff
        amountPerDay = totalSum / person
    } else if(startDate < details.fromDate && endDate <= details.toDate) {
        diff = dayDifference(startDate, details.fromDate)
        diff2 = dayDifference(details.fromDate, endDate)
        let sum1 = basicSumPerDay * diff
        let sum2 = sumPerDay * diff2
        totalSum = sum1 + sum2
        amountPerDay = totalSum / person
    } else if(startDate >= details.fromDate && endDate > details.toDate ) {
        diff = dayDifference(startDate, details.toDate)
        sum1 = sumPerDay * diff
        diff2 = dayDifference(details.toDate,endDate)
        sum2 = basicSumPerDay * diff2
        totalSum = sum1 + sum2
        amountPerDay = totalSum / person
    } else if(startDate < details.fromDate && endDate > details.toDate) {
        diff = dayDifference(startDate, details.fromDate)
        sum1 = basicSumPerDay * diff
        diff2 = dayDifference(details.fromDate,details.toDate)
        sum2 = sumPerDay * diff2
        let diff3 = dayDifference(details.toDate, endDate)
        let sum3 = basicSumPerDay * diff3
        totalSum = sum1 + sum2 + sum3
        amountPerDay = totalSum / person
    }

    res.status(200).json({
        success: true,
        hotels,
        details,
        sumForEnquiry: totalSum,
        amountPerPerson: amountPerDay
    })
})