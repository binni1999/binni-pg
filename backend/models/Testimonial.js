const mongoose = require('mongoose')
const testimonialSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }
}, {
    timestamps: true
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;