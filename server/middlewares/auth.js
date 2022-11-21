const jwt = require("jsonwebtoken")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js")
const { Users } = require("../models")

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
    const { token } = req.cookies
    console.log(token);

    if(!token) {
        return res.status(401).json('Login first to access this resource')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Users.findByPk(decoded.id)

    next()
})

// Handling users roles
exports.authorizeRoles  = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json(`Role (${req.user.role}) is not allowed to access this resource`)
        }
        next()
    }
}