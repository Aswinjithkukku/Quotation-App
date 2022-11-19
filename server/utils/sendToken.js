 const jwt = require("jsonwebtoken")
 
 // create and send token and save in cookie
 const sendToken = (user, statusCode, res) => {
    // create jwt token
    const token = jwt.sign({id: user.id, email:user.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_TIME})

    //option for cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statusCode).cookie('token', token , options).json({
        success:true,
        token,
        user
    })
 }

 module.exports = sendToken
