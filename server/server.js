const app = require("./app.js")
const db = require("./models")

const dotenv = require('dotenv')

// Handle uncaught exception
process.on('uncaughtException', err => {
    console.log(`ERROR:${err.message}`);
    console.log('Server down due to Uncaught exception');
    process.exit(1)
})

// setting up of config file path
dotenv.config({ path: "config/config.env" })


// connection to database
db.sequelize.authenticate().then(() => {
    // connecting to app server
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server started on port : ${process.env.PORT}`);
    })
})

// Handle Unhandled promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR:${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1)
    })
})
