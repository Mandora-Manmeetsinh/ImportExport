const mongoose = require('mongoose');
const Category = require('./models/Category');
const dotenv = require('dotenv');

dotenv.config();

const fixCategory = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const result = await Category.updateOne(
            { name: 'Fabrics' },
            { name: 'Premium Fabrics' }
        );

        if (result.modifiedCount > 0) {
            console.log('Successfully updated "Fabrics" to "Premium Fabrics"');
        } else {
            console.log('No category with name "Fabrics" found or update not needed.');
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

fixCategory();
