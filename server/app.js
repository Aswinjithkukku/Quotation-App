const express = require("express")
const app = express()
const cors = require("cors")

const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')

// setting up of config file path
dotenv.config({ path: "config/config.env" })

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// import all routes
const locationRouter = require("./routes/locationRouter.js")
const hotelRouter = require("./routes/hotelRouter.js")
const transferRouter = require("./routes/transferRouter.js")
const excursionRouter = require("./routes/excursionRouter.js")

app.use('/api/location', locationRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/transfer', transferRouter)
app.use('/api/excursion', excursionRouter)


module.exports = app