const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const debugCategories = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const categories = await Category.find({});
        console.log('--- CATEGORIES ---');
        console.log(JSON.stringify(categories, null, 2));

        const fabricProducts = await Product.find({}).populate('category');
        console.log('\n--- ALL PRODUCTS AND THEIR CATEGORIES ---');
        fabricProducts.forEach(p => {
            console.log(`Product: ${p.name}, Cat Name: ${p.category?.name}, Cat ID: ${p.category?._id}`);
        });

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugCategories();
