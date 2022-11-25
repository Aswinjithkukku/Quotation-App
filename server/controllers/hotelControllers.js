const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const {
  Hotels,
  HotelBookings,
  HotelPriceDetails,
  Place,
  Airports,
  Quotation,
} = require("../models");
// const dayDifference = require('../utils/dayDifference.js')
const dateRange = require("../utils/setDates.js");

//for super admin => /api/hotels/admin/all
exports.getHotels = catchAsyncErrors(async (req, res, next) => {
  const hotels = await Hotels.findAll();

  res.status(200).json({
    success: true,
    hotels,
  });
});

// for super admin => /api/hotels/admin/create
exports.createHotel = catchAsyncErrors(async (req, res, next) => {
  const { place, name, description, phone, email, address, stars } =
    req.body.hotel;

  const placeName = await Place.findOne({ where: { place: place } });

  const hotels = await Hotels.create({
    name,
    description,
    phone,
    email,
    address,
    stars,
    PlaceId: placeName.id,
    CountryId: placeName.CountryId,
  });
  const {
    fromDate,
    toDate,
    priceOneBr,
    priceTwoBr,
    priceThreeBr,
    priceSixBr,
    priceEightBr,
  } = req.body.details;

  const individuals = dateRange(
    fromDate,
    toDate,
    priceOneBr,
    priceTwoBr,
    priceThreeBr,
    priceSixBr,
    priceEightBr
  );

  const details = await HotelPriceDetails.create({
    fromDate,
    toDate,
    individuals,
    HotelId: hotels.id,
  });

  res.status(201).json({
    success: true,
    hotels,
    details,
  });
});

// for super admin => /api/hotels/admin/update/:id
exports.updateHotel = catchAsyncErrors(async (req, res, next) => {
  const params = req.params.id;

  const hotels = await Hotels.update(req.body, { where: { id: params } });

  res.status(200).json({
    success: true,
    hotels,
  });
});

// for admin get all details => /api/hotels/admin/details/all
exports.allDetails  = catchAsyncErrors(async (req,res,next) => {

  const allDetails = await HotelPriceDetails.findAll()

  res.status(200).json({
    success: true,
    allDetails
  })
})

// for superAdmin => /api/hotels/admin/updateIndividuals/:id
exports.updateIndividuals = catchAsyncErrors(async (req, res, next) => {
  const params = req.params.id;

  const { index } = req.body

  const details = await HotelPriceDetails.findByPk(params);

    details.individuals.find(item => {
    item.index === index
    if(item.index === index) {
      item.priceOneBedroom = req.body.priceOneBedroom
    }
  })
  let result = await details.save()
  // test = {
  //   priceOneBedroom: req.body.priceOneBedroom,
  //   priceTwoBedroom: req.body.priceTwoBedroom,
  //   priceThreeBedroom: req.body.priceThreeBedroom,
  //   priceSixBedroom: req.body.priceSixBedroom,
  //   priceEightBedroom: req.body.priceEightBedroom,
  // }

  res.status(200).json({
    success: true,
    result
  });
});

// search hotel on the basis of place - for users => /api/hotels/search
exports.searchHotels = catchAsyncErrors(async (req, res, next) => {
  const { placeName } = req.body;

  // find the location id
  const location = await Place.findOne({ where: { place: placeName } });

  // find the hotels in that area
  const hotels = await Hotels.findAll({ where: { PlaceId: location.id } });

  res.status(200).json({
    success: true,
    hotels,
  });
});

// enquiry for users => /api/hotels/enquiry
exports.enquiry = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const { airportIata } = req.body;

  const { CountryId } = await Airports.findOne({
    where: { iata: airportIata }
  });

  const hotels = await Hotels.findAll({ where: { CountryId: CountryId } });

  res.status(200).json({
    success: true,
    hotels,
  });
});

// enquery rest details users => /api/hotels/enquiry/:id
exports.enquiryDetails = catchAsyncErrors(async (req, res, next) => {
  const params = req.params.id;

  const {
    fromDate,
    toDate,
    peoples = 0,
    oneBed = 0,
    twoBed = 0,
    threeBed = 0,
    sixBed = 0,
    eightBed = 0,
  } = req.body;

  const details = await HotelPriceDetails.findOne({
    where: { HotelId: params },
  });
  const hotels = await Hotels.findByPk(params);

  const startDate = new Date(fromDate);
  const endDate = new Date(toDate);

  const data = details.individuals.filter((datas) => {
    return new Date(datas.date) >= startDate && new Date(datas.date) <= endDate;
  });

  const price = data.map(
    (cash) =>
      cash.priceOneBedroom * oneBed +
      cash.priceTwoBedroom * twoBed +
      cash.priceThreeBedroom * threeBed +
      cash.priceSixBedroom * sixBed +
      cash.priceEightBedroom * eightBed
  );
  const sum = price.reduce((acc, val) => acc + val, 0);
  const amountPerPerson = sum / peoples;

  res.status(200).json({
    success: true,
    hotels,
    sumForEnquiry: sum,
    amountPerPerson,
  });
});

// Hotel booking for user => /api/hotels/booking/:id
exports.hotelBooking = catchAsyncErrors(async (req, res, next) => {
  const params = req.params.id;
  const { peoples, price, place, rooms } = req.body;
  const hotel = await Hotels.findByPk(params);

  const booking = await HotelBookings.create({
    peoples,
    price,
    place,
    rooms,
    hotelName: hotel.name,
    HotelId: params,
    UserId: req.user.id,
  });
  const data = {
    TransferBookingId: null,
    HotelBookingId: booking.id,
    ExcursionId: null,
  };
  const updateData = {
    HotelBookingId: booking.id,
  };

  let { quotationPayload } = req.cookies;
  // condition
  if (!quotationPayload) {
    var quotation = await Quotation.create(data);
  } else {
    const { quotationPayload } = req.cookies;
    console.log(quotationPayload.id);
    var quotation = await Quotation.update(updateData, {
      where: { id: quotationPayload.id },
    });
    quotation = await Quotation.findByPk(quotationPayload.id);
  }
  // option for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME_CART * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // responses
  res.status(200).cookie("quotationPayload", quotation, options).json({
    success: true,
    booking,
    quotation,
  });
});

// for admin => get all bookings of hotel => /api/hotels/admin/bookings/all
exports.allHotelbookings = catchAsyncErrors( async(req,res,next) => {
  
  const allbookings = await HotelBookings.findAll()
  
  res.status(200).json({
    success: true,
    allbookings
  })
})