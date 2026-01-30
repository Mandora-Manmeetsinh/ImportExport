import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/import-export';

const productSchema = new mongoose.Schema({
    name: String,
    images: [{ url: String }],
});
const Product = mongoose.model('Product', productSchema);

async function fix() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        await Product.updateOne(
            { name: "Organic Cotton T-Shirt Set" },
            { $set: { "images.0.url": "/src/assets/kids-tshirt-set.png" } }
        );
        await Product.updateOne(
            { name: "Durable Denim Dungarees" },
            { $set: { "images.0.url": "/src/assets/kids-dungarees.png" } }
        );
        await Product.updateOne(
            { name: "Floral Lace Party Dress" },
            { $set: { "images.0.url": "/src/assets/kids-party-dress.png" } }
        );

        console.log('Kids Wear image paths updated.');
        await mongoose.disconnect();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

fix();
