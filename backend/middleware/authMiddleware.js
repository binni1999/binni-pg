const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/User')

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    //read the jwt from cookie 
    token = req.cookies.jwt;



    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')


            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized,Token failed ')
        }
    } else {
        res.status(401);
        throw new Error('Not authorized,no token ')
    }
})

//admin middleware
exports.admin = (req, res, next) => {
    if (req.user && req.user.userType === 'Admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin')
    }
}
