const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const listData = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const categories = await Category.find({});
        console.log('CATEGORIES_START');
        console.log(JSON.stringify(categories, null, 2));
        console.log('CATEGORIES_END');

        const productsCount = await Product.countDocuments();
        console.log('PRODUCTS_COUNT:', productsCount);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

listData();
