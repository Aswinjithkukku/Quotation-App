const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const {
  Excursions,
  ExcursionDetails,
  Place,
  Country,
  Airports,
} = require("../models");

// create excursions for super admin => /api/excursions/create
exports.createExcursion = catchAsyncErrors(async (req, res, next) => {
  const { placeName, excursions, title, descriptions, place } =
    req.body.excursion;

  const places = await Place.findOne({ where: { place: placeName } });

  const excursion = await Excursions.create({
    excursions,
    title,
    descriptions,
    place,
    PlaceId: places.id,
    CountryId: places.CountryId,
  });

  const { dateFrom, dateTo, price = 0 } = req.body.details;

  const details = await ExcursionDetails.create({
    dateFrom,
    dateTo,
    price,
    ExcursionId: excursion.id
  });
  res.status(201).json({
    success: true,
    excursion,
    details,
  });
});

// add more details  => /api/excursion/admin/details/create/:id
exports.createDetails = catchAsyncErrors( async(req,res,next) => {
    const params = req.params.id

    const excursion = await Excursions.findByPk(params)

    const { timeFrom, timeTo, price = 0 } = req.body;

    const details = await ExcursionDetails.create({
      timeFrom,
      timeTo,
      price,
      ExcursionId: excursion.id,
    });
    res.status(201).json({
      success: true,
      details,
    });
})

// get all excursions for super admin => /api/excursion/all
exports.allExcursions = catchAsyncErrors(async (req, res, next) => {
  const excursions = await Excursions.findAll();

  res.status(200).json({
    success: true,
    excursions,
  });
});

// get excursion for users => /api/excursion/enquiry
exports.enquiry = catchAsyncErrors(async (req, res, next) => {
  const { placeName } = req.body;

  const excursions = await Excursions.findAll({ where: { place: placeName } });

  res.status(200).json({
    success: true,
    excursions,
  });
});

// get excursionDetails for users => /api/excursion/enquiry/:id
exports.enquiryDetails = catchAsyncErrors(async (req, res, next) => {

  const params = req.params.id;
  const { time } = req.body;
  console.log(time);
   const details = await ExcursionDetails.findAll({
    where: { 
      ExcursionId: params,
    }
  });
  const excursion = await Excursions.findByPk(params);
  const data = details.filter((item) => {
  return item.timeFrom <= time && item.timeTo >= time     }
  );

//  console.log(data);
  res.status(200).json({
    success: true,
    excursion,
    details,
    data,
  });
});
