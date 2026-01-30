const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema(
    {
        whatsappNumber: {
            type: String,
            required: true,
            default: '9313029938',
        },
        companyAddress: {
            type: String,
            default: '123 Fashion Street, New Delhi, India',
        },
        companyEmail: {
            type: String,
            default: 'contact@elitewear.com',
        },
        companyPhone: {
            type: String,
            default: '+91 9313029938',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Settings', settingsSchema);
