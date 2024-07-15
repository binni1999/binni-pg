const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    addedBy: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;