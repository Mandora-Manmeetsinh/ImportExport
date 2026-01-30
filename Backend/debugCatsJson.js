const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const debugCategories = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const categories = await Category.find({});
        const products = await Product.find({}).populate('category');

        const report = {
            categories: categories.map(c => ({ id: c._id, name: c.name })),
            products: products.map(p => ({
                name: p.name,
                catName: p.category?.name,
                catId: p.category?._id
            }))
        };

        fs.writeFileSync('cat_report.json', JSON.stringify(report, null, 2));
        console.log('Report saved to cat_report.json');

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugCategories();
