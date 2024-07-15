const express = require('express')
const router = express.Router()
const controller = require('../controller/clientSideController')
const authMiddleware = require('../middleware/authMiddleware')
const { addRoomType, getRoomTypes, createService, deleteRoomType, getAllServices, deleteServiceType, addNewImage, getAllImages, deleteImage } = controller;
const { protect, admin } = authMiddleware;
router.route('/room-type').post(protect, admin, addRoomType).get(getRoomTypes)
router.route('/room-type/:id').delete(protect, admin, deleteRoomType)
router.route('/service-type').post(protect, admin, createService).get(getAllServices)
router.route('/service-type/:id').delete(protect, admin, deleteServiceType);
router.route('/images').post(protect, admin, addNewImage).get(getAllImages)
router.route('/images/:id').delete(protect, admin, deleteImage)

module.exports = router;