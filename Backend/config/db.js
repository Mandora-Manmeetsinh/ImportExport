const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};


module.exports = connectDB;
