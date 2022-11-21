const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js")
const bcrypt = require("bcryptjs")
const sendToken = require("../utils/sendToken.js")
const { Users } = require("../models")


// register user => /api/user/register
exports.registerUser = catchAsyncErrors( async (req,res,next) => {
    const { name, email, phone, password, nationality } = req.body

    // // finding the user exist with mail
    const userExist = await Users.findOne({ where: {email: email} })

    if(userExist) {
        return res.status(409).send("E-mail have been registered already")
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password,10)

    // create user documents
    const user = await Users.create({
        name,
        email,
        phone,
        password: encryptedPassword,
        nationality
      });
    
    // create jwt token
      sendToken(user,201,res)
})


//login user => /api/user/login
exports.loginUser = catchAsyncErrors(async (req,res,next) => {
  const { email, password } = req.body

  // check if email and password is entered by user
  if(!email || !password) {
    return res.status(400).send("please enter email and password")
  }
  
  // findinf user in database
  const user = await Users.findOne({ where: { email: email } })

  if(!user) {
    return res.status(401).send("Invalid email and password")
  }

  // checking password correct or not
  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if(!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401))
  }

  sendToken(user,200,res)
})

// logout user => /api/user/logout
exports.logoutUser= catchAsyncErrors( async(req,res,next) => {
  res.cookie('token', null, {
    expires: new Date( Date.now() ),
    httpOnly: true
  })
  res.status(200).json({
    success: true,
    message: "logout successfull"
  })
})

// find all users for superadmin => /api/users/admin/all
exports.allUsers = catchAsyncErrors( async(req, res, next) => {

  const users = await Users.findAll()

  res.status(200).json({
    success: true,
    users
  })
})

