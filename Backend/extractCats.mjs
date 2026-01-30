import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/import-export';

const categorySchema = new mongoose.Schema({
    name: String,
});
const Category = mongoose.model('Category', categorySchema);

async function extract() {
    try {
        await mongoose.connect(MONGO_URI);
        const categories = await Category.find();
        fs.writeFileSync(path.join(__dirname, 'cat-ids.json'), JSON.stringify(categories, null, 2));
        console.log('Categories extracted to cat-ids.json');
        await mongoose.disconnect();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

extract();
