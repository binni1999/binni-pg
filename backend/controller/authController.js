const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const asyncHandler = require("../middleware/asyncHandler");
const Enquiry = require("../models/Enquiry");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const RentDetail = require('../models/RentDetails');
const sendMailToUser = require('../controller/nodemailer')
const Testimonial = require('../models/Testimonial')

//const jwt = require('jsonwebtoken')
exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            mobileNumber: user.mobileNumber,
            roomNumber: user.roomNumber,
            permanentAddress: user.permanentAddress,
            profilePic: user.profilePic,
            testimonyPosted: user.testimonyPosted

        })
    }
    else {
        res.status(400).json({ message: 'Invalid email or password' })

    }
})

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobileNumber } = req.body;
    console.log(req.body);

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(401);
        throw new Error('User Already Exist')
    }
    const user = await User.create({ name, email, password, mobileNumber });


    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            userType: user.userType

        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

exports.logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "Logged out Successfully"
    })
})



exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -userType')
    if (user) {
        res.status(201).json(
            user
            // _id: user._id,
            // name: user.name,
            // email: user.email,
            // roomNumber: user.roomNumber,
            // permanentAddress: user.permanentAddress,
            // profilePic: user.profilePic
        )
    }
    else {
        res.status(400);
        throw new Error('User not Found')
    }
})

exports.updateUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user.id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.roomNumber = req.body.roomNumber || user.roomNumber;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
        user.permanentAddress = req.body.permanentAddress || user.permanentAddress;
        user.profilePic = req.body.profilePic || user.profilePic;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            userType: updatedUser.userType,
            email: updatedUser.email,
            roomNumber: updatedUser.roomNumber,
            mobileNumber: updatedUser.mobileNumber,
            permanentAddress: updatedUser.permanentAddress,
            profilePic: updatedUser.profilePic
        })
    } else {
        res.status(400);
        throw new Error('User not found')
    }

})

//create enquiries for user

exports.createEnquiry = asyncHandler(async (req, res) => {
    const { name, email, contact, message } = req.body;
    console.log(req.body);


    if (!req.user) {
        const enq = await Enquiry.create({ name, email, message, contact, })
        return res.status(200).json({ enq })
    }

    var loginUser = undefined;
    if (req.user._id) {
        loginUser = await User.findById(req.user._id);
    }
    console.log(req.body, req.user._id, loginUser);

    const enquiry = await Enquiry.create({ name, email, message, contact, user: loginUser })
    console.log('created enquiry', enquiry);

    if (enquiry) {
        const result = await Enquiry.findById(enquiry._id).populate({
            path: 'user',
            select: 'name email mobileNumber',

        })
        res.status(200).json({ result })
    } else {
        res.status(400);
        throw new Error('Failed to create enquiry')
    }
})

exports.getUserEnquiry = asyncHandler(async (req, res) => {
    const enquiries = await Enquiry.find({ user: { _id: req.user._id } }).populate({
        path: 'user',
        select: 'name email mobileNumber',
    })
    if (enquiries.length !== 0) {
        res.status(200).json(enquiries);
    } else {
        res.status(200).json({ message: "No Query" })
    }

})


exports.showPdfs = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    const pdfDirectory = path.join(__dirname, '../../upload_frontend', 'rentslip', `${user._id}`);
    console.log(pdfDirectory);
    fs.readdir(pdfDirectory, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        res.json(files)
    })
})

exports.downloadPdf = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    const { pdfName } = req.body;


    const pdfDirectory = path.join(__dirname, '../../upload_frontend', 'rentslip', `${user._id}`);
    const pdfPath = path.join(pdfDirectory, pdfName);
    fs.readFile(pdfPath, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read PDF file' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${pdfName}"`);
        res.send(data);
    })
})


exports.getRentPaidDetailsOfUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    const rentDetails = await RentDetail.find({ tenet: user._id, rentPaid: true }).populate({
        path: 'tenet',
        select: '-password -profilePic'
    }).sort({ lastPaid: -1 })
    if (rentDetails) {
        res.status(200).json(rentDetails)
    } else {
        res.status(400).json({ message: "Something wrong" })
    }

})


exports.updateUserPassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    console.log(req.body);

    const user = await User.findById(req.user._id);
    const isPasswordMatch = await user.comparePassword(currentPassword);
    console.log('password match or not', isPasswordMatch);

    if (isPasswordMatch) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" })

    }
    else {
        // res.status(400).json({ message: "Current password is not match" })
        res.status(400)
        throw new Error('Current password is not match')
    }
})


exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email })
    console.log(user);

    if (!user) {
        return res.status(400).send('User with given email does not exist')
    }
    const token = crypto.randomBytes(32).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`
    const html = `<h3>Please click on the below link to reset your password</h3><br><p>${resetPasswordUrl}</p><br><br><br><br><span style="color:green;">Regards<br>Wamson CO-Living PG <br>Buddha Tower 2,Noida,<br> Uttar Pradesh 201301</span>`
    sendMailToUser(user.email, 'Password Reset', html)
    res.status(200).json({ message: "Password reset link sent to your email" })

})

exports.resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    console.log(req.body);

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired');
    }
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password has been reset" })
})


exports.postUserTestimony = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    console.log(req.body);

    const user = await User.findById(req.user._id);
    if (user.testimonyPosted) {
        return res.status(400).json({ message: 'You have already posted a testimony' })
    }

    else if (user) {
        const testimony = await Testimonial.create({ title, content, user });
        user.testimonyPosted = true;
        await user.save();
        res.status(200).json({ message: "Testimony Posted Successfully", testimony })
    }
    else {
        res.status(400).json({ message: "User not found" })
    }
})

exports.getUserTestimony = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const testimony = await Testimonial.find({ user: user._id }).populate('user');
        res.status(200).json({ testimony })
    }
    else {
        res.status(400).json({ message: "User not found" })
    }
})

