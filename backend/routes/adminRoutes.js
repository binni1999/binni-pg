const express = require('express')
const router = express.Router()
const authMiddleware = require('./../middleware/authMiddleware')
const adminController = require('./../controller/adminController')
const { getAllUsers, getUserById, deleteUser, updateUser, getAllEnquiries, updateEnquiry, getEnquiryById, createRentDetailsForUser, getRentDetailsOfUser, getAllRentDetails, updateRentDetails, getRentDetailsOfUserForAdmin, getAllTestimonials } = adminController;
const { protect, admin } = authMiddleware;


router.route('/users').get(protect, admin, getAllUsers)
router.route('/users/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser)
router.route('/enquiry').get(protect, admin, getAllEnquiries)

router.route('/enquiry/:id').get(protect, admin, getEnquiryById).put(protect, admin, updateEnquiry)
router.route('/rent-details').get(protect, admin, getAllRentDetails)
router.route('/rent-details/:id').get(protect, admin, getRentDetailsOfUser).post(protect, admin, createRentDetailsForUser).put(protect, admin, updateRentDetails)

router.route('/rent-paid/:id').get(protect, admin, getRentDetailsOfUserForAdmin)
router.route('/testimony').get(getAllTestimonials)
module.exports = router;