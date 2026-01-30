import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

// Use local fallback for seeding as cloud URI in .env is a placeholder
const MONGO_URI = 'mongodb://127.0.0.1:27017/import-export';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    images: [{ url: String }],
    isFeatured: { type: Boolean, default: false },
    countInStock: { type: Number, default: 10 },
    fabricType: String,
    sizes: [String],
    colors: [String],
    moq: String,
    exportCountries: [String],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to Local MongoDB');

        const products = [
            // Men's Wear
            {
                name: "Premium Linen Shirt",
                description: "High-quality light blue linen shirt, perfect for summer. Export standard stitching.",
                price: 1200,
                category: "697c41161733b1b553a807eb",
                images: [{ url: "/src/assets/mens-linen-shirt.png" }],
                fabricType: "Linen",
                sizes: ["S", "M", "L", "XL"],
                colors: ["Light Blue"],
                moq: "50 pieces",
                exportCountries: ["USA", "UK", "Germany"]
            },
            {
                name: "Slim Fit Khaki Chinos",
                description: "Versatile khaki chinos made from premium cotton twill. Durable and stylish.",
                price: 1500,
                category: "697c41161733b1b553a807eb",
                images: [{ url: "/src/assets/mens-chinos.png" }],
                fabricType: "Cotton Twill",
                sizes: ["30", "32", "34", "36"],
                colors: ["Khaki"],
                moq: "100 pieces",
                exportCountries: ["UAE", "Australia", "Canada"]
            },
            {
                name: "Navy Wool Blazer",
                description: "Classic navy blue wool blazer. Expertly tailored for a sharp, executive look.",
                price: 4500,
                category: "697c41161733b1b553a807eb",
                images: [{ url: "/src/assets/mens-blazer.png" }],
                fabricType: "Wool Blend",
                sizes: ["38", "40", "42", "44"],
                colors: ["Navy Blue"],
                moq: "20 pieces",
                exportCountries: ["UK", "France", "Japan"]
            },
            // Women's Wear
            {
                name: "Silk Floral Maxi Dress",
                description: "Elegant silk maxi dress with a soft floral print. Ideal for evening wear.",
                price: 3200,
                category: "697c41161733b1b553a807ec",
                images: [{ url: "/src/assets/womens-silk-dress.png" }],
                fabricType: "Pure Silk",
                sizes: ["XS", "S", "M", "L"],
                colors: ["Floral Pink"],
                moq: "30 pieces",
                exportCountries: ["USA", "Italy", "UAE"]
            },
            {
                name: "Tailored Executive Trousers",
                description: "Sharp charcoal grey high-waist trousers for the modern professional.",
                price: 1800,
                category: "697c41161733b1b553a807ec",
                images: [{ url: "/src/assets/womens-trousers.png" }],
                fabricType: "Polyester Viscose",
                sizes: ["26", "28", "30", "32"],
                colors: ["Charcoal Grey"],
                moq: "50 pieces",
                exportCountries: ["Singapore", "UK", "Australia"]
            },
            {
                name: "Cashmere Cable Knit",
                description: "Luxurious cream cashmere sweater. Exceptionally soft and warm.",
                price: 2800,
                category: "697c41161733b1b553a807ec",
                images: [{ url: "/src/assets/womens-sweater.png" }],
                fabricType: "100% Cashmere",
                sizes: ["S", "M", "L"],
                colors: ["Cream"],
                moq: "25 pieces",
                exportCountries: ["Germany", "Norway", "Canada"]
            },
            // Kids Wear
            {
                name: "Organic Cotton T-Shirt Set",
                description: "Soft, breathable organic cotton t-shirts for kids. Pack of 3 vibrant colors.",
                price: 800,
                category: "697c41161733b1b553a807ed",
                images: [{ url: "/src/assets/kids-tshirt-set.png" }],
                fabricType: "Organic Cotton",
                sizes: ["2T", "3T", "4T", "5T"],
                colors: ["Multi"],
                moq: "100 packs",
                exportCountries: ["USA", "Canada", "UK"]
            },
            {
                name: "Durable Denim Dungarees",
                description: "Sturdy denim dungarees for play and comfort. Adjustable straps.",
                price: 1200,
                category: "697c41161733b1b553a807ed",
                images: [{ url: "/src/assets/kids-dungarees.png" }],
                fabricType: "Denim",
                sizes: ["3Y", "4Y", "5Y", "6Y"],
                colors: ["Indigo"],
                moq: "50 pieces",
                exportCountries: ["Australia", "Japan", "UAE"]
            },
            {
                name: "Floral Lace Party Dress",
                description: "Sweet party dress with delicate lace and floral embroidery. Satin lining.",
                price: 1600,
                category: "697c41161733b1b553a807ed",
                images: [{ url: "/src/assets/kids-party-dress.png" }],
                fabricType: "Tulle & Satin",
                sizes: ["4Y", "6Y", "8Y", "10Y"],
                colors: ["Soft Pink"],
                moq: "40 pieces",
                exportCountries: ["USA", "UK", "France"]
            },
            // Fabrics
            {
                name: "Egyptian Cotton Roll",
                description: "Extra-long staple Egyptian cotton. Supreme softness and durability.",
                price: 800,
                category: "697c41161733b1b553a807ee",
                images: [{ url: "/src/assets/fabric-egyptian-cotton.png" }],
                fabricType: "Egyptian Cotton",
                moq: "500 meters",
                exportCountries: ["Worldwide"]
            },
            {
                name: "Bamboo Linen Blend",
                description: "Eco-friendly bamboo and linen blend. Naturally antibacterial and breathable.",
                price: 950,
                category: "697c41161733b1b553a807ee",
                images: [{ url: "/src/assets/fabric-bamboo-linen.png" }],
                fabricType: "Bamboo Linen",
                moq: "300 meters",
                exportCountries: ["USA", "Sweden", "UK"]
            },
            {
                name: "Recycled Tech Knit",
                description: "Performance knit fabric made from recycled ocean plastics. Moisture-wicking.",
                price: 700,
                category: "697c41161733b1b553a807ee",
                images: [{ url: "/src/assets/fabric-recycled-poly.png" }],
                fabricType: "Recycled Polyester",
                moq: "400 meters",
                exportCountries: ["Japan", "Germany", "South Korea"]
            },
            // Seasonal Collections
            {
                name: "Winter Puffer Jacket",
                description: "High-insulation unisex puffer jacket. Built for extreme cold with style.",
                price: 3800,
                category: "697c41161733b1b553a807ef",
                images: [{ url: "/src/assets/seasonal-puffer.png" }],
                fabricType: "Insulated Nylon",
                sizes: ["S", "M", "L", "XL", "XXL"],
                colors: ["Black", "Grey"],
                moq: "100 pieces",
                exportCountries: ["Canada", "Russia", "USA"]
            },
            {
                name: "Tropical Beach Kaftan",
                description: "Flowy, vibrant kaftan for luxury beach resorts. Quick-dry breathable fabric.",
                price: 1400,
                category: "697c41161733b1b553a807ef",
                images: [{ url: "/src/assets/seasonal-kaftan.png" }],
                fabricType: "Chiffon",
                sizes: ["Free Size"],
                colors: ["Tropical Print"],
                moq: "200 pieces",
                exportCountries: ["UAE", "Maldives", "Australia"]
            },
            {
                name: "Autumn Cashmere Scarf",
                description: "Rich mustard yellow cashmere scarf. The perfect autumn accessory.",
                price: 900,
                category: "697c41161733b1b553a807ef",
                images: [{ url: "/src/assets/seasonal-scarf.png" }],
                fabricType: "Pure Cashmere",
                sizes: ["One Size"],
                colors: ["Mustard Yellow"],
                moq: "150 pieces",
                exportCountries: ["UK", "France", "Germany"]
            }
        ];

        await Product.insertMany(products);
        console.log(`${products.length} products successfully seeded.`);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (err) {
        console.error('Error seeding products:', err.message);
        process.exit(1);
    }
}

seed();
