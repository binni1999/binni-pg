const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const Enquiry = require('../models/Enquiry')
//const RentDetails = require('../models/RentDetails');
const RentDetail = require("../models/RentDetails");
const Testimonial = require('../models/Testimonial')

//For Admin 
exports.getAllUsers = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { email: { $regex: req.query.keyword, $options: 'i' } }, {
            roomNumber: isNaN(parseInt(req.query.keyword, 10)) ? undefined : parseInt(req.query.keyword, 10)
        }]
    } : {};


    const count = await User.countDocuments({ ...keyword, userType: 'Tenet' })
    const users = await User.find({ ...keyword, userType: 'Tenet' }).select('-password ').limit(pageSize).skip(pageSize * (page - 1))
    if (users) {
        res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) })
    } else {
        res.status(404);
        throw new Error("No user available")
    }
})


exports.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.userType === 'Admin') {
            res.status(400);
            throw new Error('Can not delete admin user')
        }
        await User.findByIdAndDelete(user._id)
        res.status(200).json({ message: 'User deleted Successfully' })
    } else {
        res.status(404);
        throw new Error('User not found')
    }
})

exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(req.body);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.userType = req.body.userType || user.userType;
        user.permanentAddress = req.body.permanentAddress || user.permanentAddress;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
        user.roomNumber = req.body.roomNumber || user.roomNumber;
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            userType: updatedUser.userType,
            mobileNumber: updatedUser.mobileNumber,
            roomNumber: updatedUser.roomNumber,
            permanentAddress: updatedUser.permanentAddress,
            profilePic: updatedUser.profilePic
        })

    }
    else {
        res.status(404);
        throw new Error('User not found')
    }
})



exports.getAllEnquiries = asyncHandler(async (req, res) => {

    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {
        name: { $regex: req.query.keyword, $options: 'i' }
    } : {};

    const count = await Enquiry.countDocuments({ ...keyword })
    const enquiries = await Enquiry.find({ ...keyword }).sort('isResolved').limit(pageSize).skip(pageSize * (page - 1));
    res.status(200).json({ enquiry: enquiries, page, pages: Math.ceil(count / pageSize) })
})

exports.getEnquiryById = asyncHandler(async (req, res) => {
    const enquiry = await Enquiry.findById(req.params.id)
    if (enquiry) {
        res.status(200).json(enquiry)
    } else {
        res.status(400);
        throw new Error('Not found')
    }
})


exports.updateEnquiry = asyncHandler(async (req, res) => {
    const response = req.body.response;
    console.log(req.body);

    console.log('response is ', response);

    const enquiry = await Enquiry.findById(req.params.id);

    const userAdmin = await User.findById(req.user._id).select('name email mobileNumber')
    if (req.user.userType !== 'Admin') {
        res.status(400);
        throw new Error('Only Admin is allowed to resolve the Query.')
    }
    if (userAdmin) {
        enquiry.response = response;
        enquiry.isResolved = true;
        enquiry.resolvedBy = userAdmin;
        enquiry.resolvedOn = new Date();
        const updatedEnquiry = await enquiry.save();
        res.status(200).json({
            _id: updatedEnquiry._id,
            name: updatedEnquiry.name,
            email: updatedEnquiry.email,
            contact: updatedEnquiry.contact,
            message: updatedEnquiry.message,
            isResolved: updatedEnquiry.isResolved,
            resolvedBy: updatedEnquiry.resolvedBy,
            resolvedOn: updatedEnquiry.resolvedOn,
            response: updatedEnquiry.response
        })
    } else {
        res.status(400);
        throw new Error('Enquiry Could not be updated.')
    }

})

exports.createRentDetailsForUser = asyncHandler(async (req, res) => {
    const { rentAmount, electricity, month, year } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);
    const today = new Date();
    const thirtyDaysBefore = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    if (user) {
        const userAlreadyNotified = await RentDetail.find({ $and: [{ tenet: user._id }, { month: month }, { rentPaid: false }] });
        if (userAlreadyNotified.length > 0) {
            res.status(400);
            throw new Error('User has been already notified!')
        }
    }

    if (user) {
        const rentAlreadyPaid = await RentDetail.find({ $and: [{ tenet: user._id }, { month: month }, { rentPaid: true }] });
        if (rentAlreadyPaid.length === 0) {

            const rentDetails = await RentDetail.create({
                rentAmount: rentAmount,
                electricity: electricity,
                month: month,
                year: year,
                lastPaid: thirtyDaysBefore,
                tenet: user

            });
            res.status(200).json({ rentDetails })
        } else {
            res.status(400).json({ message: "Rent has been already Paid by user for this month!" })
        }
    } else {
        res.status(400).json({ message: "User not found!" })
    }
})

exports.getRentDetailsOfUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const rentDetails = await RentDetail.find({ tenet: user._id, rentPaid: false }).populate({
        path: 'tenet',
        select: '-password -profilePic'
    })
    if (rentDetails) {
        res.status(200).json(rentDetails)
    } else {
        res.status(400).json({ message: "Something wrong" })
    }

})

exports.getAllRentDetails = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
        $or: [{ name: { $regex: req.query.keyword, $options: 'i' } }, { email: { $regex: req.query.keyword, $options: 'i' } }, {
            roomNumber: isNaN(parseInt(req.query.keyword, 10)) ? undefined : parseInt(req.query.keyword, 10)
        }]
    } : {};

    const count = RentDetail.countDocuments({ ...keyword });
    const rentDetails = await RentDetail.find({ ...keyword }).populate({
        path: 'tenet',
        select: '-password -profilePic'
    })
    if (rentDetails) {
        res.status(200).json({ rentDetails, page, pages: Math.ceil(count / pageSize) })
    } else {
        res.status(400).json({ message: "No Rent Details Found" })
    }
})


exports.updateRentDetails = asyncHandler(async (req, res) => {
    const { rentAmount, electricity, month, year } = req.body;

    const rentDetails = await RentDetail.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (user.userType === 'Admin' && rentDetails) {
        rentDetails.rentAmount = rentAmount;
        rentDetails.electricity = electricity;
        rentDetails.month = month;
        rentDetails.year = year;
        await rentDetails.save();
        res.status(200).json({ rentDetails })
    } else {
        res.status(400).json({ message: "Something wrong" })
    }
})


exports.getRentDetailsOfUserForAdmin = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
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


exports.getAllTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find().populate({
        path: 'user',
        select: '-password -profilePic'
    }).sort({ createdAt: -1 })
    res.status(200).json(testimonials)
})