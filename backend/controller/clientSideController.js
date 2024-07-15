
const asyncHandler = require("../middleware/asyncHandler");
const Room = require('../models/Room')
const Service = require("../models/Service");
const User = require("../models/User");
const Image = require("../models/Image")
const deleteFile = require('./../utils/deleteFile')
exports.addRoomType = asyncHandler(async (req, res) => {
    const { image, caption } = req.body;

    const user = await User.findById(req.user._id)
    if (user) {
        const room = await Room.create({ image, caption, addedBy: user });
        const createdRoom = await Room.findById(room._id).populate({
            path: 'addedBy',
            select: 'name email'
        })
        res.status(201).json({ createdRoom })
    }
    else {
        res.status(400).json({ message: "There is some issue while adding image." })
    }
})

exports.getRoomTypes = asyncHandler(async (req, res) => {
    const rooms = await Room.find().populate({
        path: 'addedBy',
        select: 'name email '
    })
    if (rooms) {
        res.status(200).json(rooms)
    } else {
        res.status(400).json({ message: 'No rooms available' })
    }
})

exports.deleteRoomType = asyncHandler(async (req, res) => {
    const roomId = req.params.id;
    console.log(roomId);

    const room = await Room.findById(roomId);
    if (room) {
        await deleteFile(room.image);
        await Room.findByIdAndDelete(room._id);

        res.status(200).json({ message: 'Deleted Successfully' })
    } else {
        res.status(400).json({ message: 'No room found.' })
    }
})

exports.createService = asyncHandler(async (req, res) => {
    const { title, caption, image } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        const service = await Service.create({ title, caption, image, addedBy: user });
        const createdService = await Service.findById(service._id).populate({
            path: 'addedBy',
            select: 'name email'
        })
        res.status(201).json(createdService)
    } else {
        res.status(400).json({ message: "There is some issue while adding service." })
    }
})

exports.getAllServices = asyncHandler(async (req, res) => {
    const services = await Service.find().populate({
        path: 'addedBy',
        select: 'name email'
    })
    if (services) {
        res.status(200).json(services)
    } else {
        res.status(400).json({ message: 'No services available' })
    }
})

exports.deleteServiceType = asyncHandler(async (req, res) => {
    const serviceId = req.params.id;
    console.log(serviceId);
    const service = await Service.findById(serviceId);
    if (service) {
        await deleteFile(service.image)
        await Service.findByIdAndDelete(service._id);
        res.status(200).json({ message: 'Deleted Successfully' })
    } else {
        res.status(400).json({ message: 'No room found.' })
    }
})

exports.addNewImage = asyncHandler(async (req, res) => {
    const { image } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        const newImage = await Image.create({ image, addedBy: req.user });
        const addedImage = await Image.findById(newImage._id);
        res.status(201).json(addedImage)

    }
    else {
        res.status(400).json({ message: 'There is something wrong while adding the image!' })
    }

})

exports.getAllImages = asyncHandler(async (req, res) => {
    const images = await Image.find().populate({
        path: 'addedBy',
        select: "name email"
    })
    if (images) {
        res.status(200).json({ images })
    } else {
        res.status(400).json({ message: 'No images available!' })
    }
})

exports.deleteImage = asyncHandler(async (req, res) => {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);
    if (image) {
        await deleteFile(image.image);
        await Image.findByIdAndDelete(image._id);
        res.status(200).json({ message: "Image Deleted Successfully" })
    } else {
        res.status(400).json({ message: "No Image Found!" })
    }
})

