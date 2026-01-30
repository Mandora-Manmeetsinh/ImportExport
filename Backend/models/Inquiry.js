const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
        },
        message: {
            type: String,
            required: [true, 'Please add a message'],
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        status: {
            type: String,
            enum: ['New', 'Contacted', 'Closed'],
            default: 'New',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
