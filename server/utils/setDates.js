const dateRange = (startDate, endDate, priceOneBr,priceTwoBr,priceThreeBr,priceSixBr,priceEightBr ,steps = 1)  => {
    let currentDate = new Date(startDate);
    var ind = 1
    let individuals = []
    while (currentDate <= new Date(endDate)) {
        let datas = {
          index: ind,
          date: new Date(currentDate),
          priceOneBedroom: priceOneBr,
          priceTwoBedroom: priceTwoBr,
          priceThreeBedroom: priceThreeBr,
          priceSixBedroom: priceSixBr,
          priceEightBedroom: priceEightBr,
        }
      individuals.push(datas)
      // Using UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
      ind += 1
    }
    return individuals;
  }

  module.exports = dateRange