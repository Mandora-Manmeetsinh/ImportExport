const mongoose = require('mongoose');
const Category = require('./models/Category');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const exportCategories = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const categories = await Category.find({});
        fs.writeFileSync('categories_mapped.json', JSON.stringify(categories, null, 2));
        console.log('Categories exported to categories_mapped.json');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

exportCategories();
