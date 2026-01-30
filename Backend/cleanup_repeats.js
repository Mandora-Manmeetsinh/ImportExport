const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const cleanupProducts = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const result = await Product.deleteMany({ 'images.public_id': { $regex: /^seed_/ } });
        console.log(`Deleted ${result.deletedCount} repeated seeded products.`);

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

cleanupProducts();
