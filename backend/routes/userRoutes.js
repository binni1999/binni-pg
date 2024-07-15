const express = require('express')
const router = express.Router()
const authController = require('./../controller/authController')
const authMiddleware = require('./../middleware/authMiddleware')
const adminController = require('../controller/adminController')
const { registerUser, authUser, logoutUser, getUserProfile, updateUserProfile, createEnquiry, getUserEnquiry, downloadPdf, showPdfs, getRentPaidDetailsOfUserProfile, updateUserPassword, forgotPassword, resetPassword, postUserTestimony, getUserTestimony } = authController;
const { protect } = authMiddleware;
const { getRentDetailsOfUser } = adminController;
router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/enquiry').post(createEnquiry)
router.route('/user-enquiry').get(protect, getUserEnquiry).post(protect, createEnquiry);

router.route('/rent-details/:id').get(protect, getRentDetailsOfUser);
router.route('/show-pdf/:userId').get(protect, showPdfs);
router.route('/download-pdf/:userId').post(protect, downloadPdf);
router.route('/paid-rent-details').get(protect, getRentPaidDetailsOfUserProfile);

router.route('/update-password').put(protect, updateUserPassword)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.route('/testimony').post(protect, postUserTestimony).get(protect, getUserTestimony)


module.exports = router;
