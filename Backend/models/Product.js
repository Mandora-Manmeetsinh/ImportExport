const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add a category'],
            ref: 'Category',
        },
        images: [
            {
                url: String,
                public_id: String,
            },
        ],
        video: {
            url: String,
            public_id: String,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        fabricType: {
            type: String,
        },
        sizes: [String],
        colors: [String],
        moq: {
            type: String,
        },
        packingDetails: {
            type: String,
        },
        exportCountries: [String],
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
