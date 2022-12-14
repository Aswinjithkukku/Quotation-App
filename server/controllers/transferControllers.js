const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js")
const { Airports, Country, Place, Transfers, TransferBookings, Quotation } = require('../models')


// create airports for super admins => /api/transfer/admin/airports/create
exports.createAirports = catchAsyncErrors( async (req,res,next) => {
    const { iata, name, country } = req.body

    const { id } = await Country.findOne({ where: { name: country } })

    const airports = await Airports.create({
        iata,
        name,
        country,
        CountryId: id
    })

    res.status(201).json({
        success: true,
        airports
    })
})

// get all airports for super admin => /api/transfer/admin/airports/all
exports.allAirports = catchAsyncErrors(async(req,res,next) => {

    const airports = await Airports.findAll()

    res.status(200).json({
        success:true,
        airports
    })
})

// create transfers table  for superadmin => /api/transfers/admin/create
exports.createTransfers = catchAsyncErrors( async(req,res,next) => {
    const { transferfrom, transferTo, private, shared } = req.body
    // console.log(transferFrom);
    // console.log(transferTo);

    const airport = await Airports.findOne({ where: { id: transferfrom } }) 
    const place = await Place.findOne({ where: { id: transferTo } }) 
    console.log(airport);
    console.log(place);

    const isExist = await Transfers.findOne({
        where: {
            AirportId: airport.id,
            PlaceId: place.id
        }
    })
    // identifying the combination exist or not
    if(!isExist) {
        const transfer = await Transfers.create({
            transferfrom,
            transferTo,
            private,
            shared,
            AirportId: airport.id,
            PlaceId: place.id
        })
    
        res.status(201).json({
            success: true,
            transfer
        })
    }
        
    res.status(400).json({
        success: false,
        alert: "This combination already exist"
    })
    

})
// transfer for user => /api/transfers/
exports.transfer = catchAsyncErrors( async(req,res,next) => {

    const airport = await Airports.findAll() 
    const place = await Place.findAll() 

    res.status(201).json({
        success: true,
        airport,
        place
    })
})

// all transfer =>  api/transfer/admin/all
exports.allTransfers =  catchAsyncErrors ( async(req,res,next) => {

    const transfers = await Transfers.findAll({ raw: true, nest: true,})
    
    const airport = await Airports.findAll({ raw: true, nest: true,}) 
    const place = await Place.findAll({ raw: true, nest: true,})
 
    for(let i = 0; i < transfers.length; i++) {
        for(let j= 0; j < airport.length; j++) {
            if(transfers[i].AirportId === airport[j].id) {
                transfers[i].airport = airport[j].name
                break;
            }
        }
        for(let k= 0; k < place.length; k++) {
            if(transfers[i].PlaceId === place[k].id) {
                transfers[i].place = place[k].place
                break;
            }
        }
    }
    console.log(transfers);

    res.status(200).json({
        success: true,
        transfers,
        // place
    })
} )

// transfer enquiry fpr users => /api/transfer/enquiry
exports.enquiry =  catchAsyncErrors( async(req,res,next) => {
    console.log(req.body.iata);
    const { people, airportIata, placeName, transferStatus, returnStatus } = req.body

    const airport = await Airports.findOne({ where: { iata: airportIata } }) 
    const place = await Place.findOne({ where: { place: placeName } }) 

    const transfer = await Transfers.findOne({
        where: {
            AirportId: airport.id,
            PlaceId: place.id
        }
    })

    let amount = 0
    // amounts distributed as per number of peoples 
    if(transferStatus === "private") {
        if(people > 4 && people < 9 ) {
            amount = (transfer.private * 2) / people
        } else {
            amount = transfer.private / people
        }
    } else {
        amount = transfer.shared * people
    }

    // if the user asked for the return travel
    if (returnStatus === true) {
        amount *= 2
    }

    res.status(200).json({
        success: true,
        transfer,
        amountPerPerson: amount
    })
})

// transfer booking for user => /api/transfer/booking/:id
exports.transferBooking = catchAsyncErrors( async(req,res,next) => {
    const { peoples, price, place, transferStatus, returnStatus } = req.body

    const params = req.params.id
console.log(req);
    const booking = await TransferBookings.create({
        peoples,
        price,
        place,
        transferStatus,
        returnStatus,
        TransferId: params,
        UserId: req.user.id
    })

    const data = {
        TransferBookingId: booking.id,
        HotelBookingId:null,
        ExcursionId: null
    }

    const updateData = {
        TransferBookingId: booking.id,   
    }

    let { quotationPayload } = req.cookies
    // condition
    if( !quotationPayload ) {
        var quotation = await Quotation.create(data)
    
    } else {
        const { quotationPayload } = req.cookies
        console.log(quotationPayload.id);
        var quotation = await Quotation.update(updateData,{ where: { id: quotationPayload.id} } )
        quotation = await Quotation.findByPk(quotationPayload.id)
    }
    // option for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME_CART * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    // responses
    res.status(200).cookie('quotationPayload', quotation, options).json({
        success: true,
        booking,
        quotation
    })
})
