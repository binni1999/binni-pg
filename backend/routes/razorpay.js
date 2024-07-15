const express = require('express')
const Razorpay = require('razorpay')
const crypto = require('crypto');
const Payment = require('../models/Payment');
const router = express.Router();
const authMiddleware = require('./../middleware/authMiddleware');
const User = require('../models/User');
const createRentSlip = require('./../utils/generatePdf')
const RentDetails = require('../models/RentDetails')
const { protect } = authMiddleware;
let rentDetails = {}
const date = new Date;
const monthName = date.toLocaleString('default', { month: 'long' });
const year = date.getFullYear();
const formattedDate = date.toLocaleDateString({
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
});
const razorpay = new Razorpay({
    key_id: 'rzp_test_1kYJ0L2KscVhSJ',
    key_secret: 'F03n2hOJSiqsR6H1Hg2rAsc3'
})

router.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt: `receipt_${Date.now()}`,

        }

        razorpay.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            //console.log(order);
            rentDetails.amount = order.amount / 100;
            rentDetails.orderId = order.id;
            res.status(200).json({ data: order });

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });

    }
})

router.post('/verify-payment', protect, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, rentDetailsId } = req.body;


    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac('sha256', 'F03n2hOJSiqsR6H1Hg2rAsc3').update(sign.toString()).digest('hex')

        const isAuthentic = expectedSign === razorpay_signature;

        const user = await User.findById(req.user._id);
        const rentDetailsDB = await RentDetails.findById(rentDetailsId);
        if (isAuthentic && user) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                paidBy: user
            })

            const userDetails = {
                name: user.name,
                email: user.email,
                phone: user.mobileNumber
            };

            rentDetails.paymentDate = formattedDate;
            rentDetails.paymentMethod = 'Razorpay'

            const fileName = `${user._id}-${rentDetailsDB.month}-${year}.pdf`;
            const folderName = `${user._id}`;
            createRentSlip(userDetails, rentDetails, folderName, fileName);
            await payment.save();

            if (rentDetailsDB) {
                rentDetailsDB.rentPaid = true;
                rentDetailsDB.lastPaid = new Date();
                await rentDetailsDB.save();
            }



            res.json({
                message: "Payment Successful",
                payment
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });

    }

})

module.exports = router;