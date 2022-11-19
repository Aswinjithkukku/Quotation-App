
const dayDifference = (startDate, endDate) => {
        // getting time differnce of two dates 
        let timeDifference = startDate.getTime() - endDate.getTime()
        // getting the difference of days
        let days = Math.round(timeDifference / (1000 * 3600 * 24))
        let absValue = Math.abs(days)
  return absValue
}

module.exports = dayDifference
