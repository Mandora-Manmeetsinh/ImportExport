const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const seedUniqueProducts = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const categories = {
            men: "697c41161733b1b553a807eb",
            women: "697c41161733b1b553a807ec",
            kids: "697c41161733b1b553a807ed"
        };

        const newProducts = [
            // Men's Wear
            {
                name: "Deep Navy Linen Shirt",
                description: "Premium handcrafted linen shirt for effortless elegance. Breathable and comfortable for all seasons.",
                price: 89,
                category: categories.men,
                countInStock: 120,
                images: [{ url: '/products/linen_shirt.png', public_id: 'seed_uni_men_1' }],
                fabricType: "100% Belgian Linen",
                sizes: ["M", "L", "XL"],
                colors: ["Navy"],
                moq: "200 Pieces",
                exportCountries: ["France", "USA", "UK"]
            },
            {
                name: "Slim Fit Khaki Chinos",
                description: "Classic tailored chinos made from durable cotton twill. Perfect for both business and casual wear.",
                price: 75,
                category: categories.men,
                countInStock: 200,
                images: [{ url: '/products/chinos.png', public_id: 'seed_uni_men_2' }],
                fabricType: "98% Cotton, 2% Elastane",
                sizes: ["30", "32", "34", "36"],
                colors: ["Khaki"],
                moq: "500 Pieces",
                exportCountries: ["Germany", "Canada"]
            },
            {
                name: "Tailored Business Blazer",
                description: "Softly structured wool blazer with a modern cut. A staple for the international professional.",
                price: 195,
                category: categories.men,
                countInStock: 85,
                images: [{ url: '/products/blazer.png', public_id: 'seed_uni_men_3' }],
                fabricType: "Super 120s Wool",
                sizes: ["40R", "42R", "44R"],
                colors: ["Midnight Blue"],
                moq: "100 Pieces",
                exportCountries: ["USA", "Japan"]
            },
            {
                name: "Pure White Oxford Shirt",
                description: "Crisp, classic Oxford cloth button-down. The foundation of any timeless wardrobe.",
                price: 65,
                category: categories.men,
                countInStock: 300,
                images: [{ url: '/src/assets/best-seller-2.png', public_id: 'seed_uni_men_4' }],
                fabricType: "Premium Oxford Cotton",
                sizes: ["S", "M", "L", "XL"],
                colors: ["White"],
                moq: "1000 Pieces",
                exportCountries: ["Global"]
            },
            {
                name: "Forest Green Pique Polo",
                description: "High-performance pique cotton polo with a premium finish and athletic silhouette.",
                price: 45,
                category: categories.men,
                countInStock: 150,
                images: [{ url: '/src/assets/best-seller-4.png', public_id: 'seed_uni_men_5' }],
                fabricType: "Pique Cotton",
                sizes: ["M", "L", "XL"],
                colors: ["Forest Green"],
                moq: "800 Pieces",
                exportCountries: ["Australia", "UK"]
            },

            // Women's Wear
            {
                name: "Midnight Silk Maxi Dress",
                description: "A statement of luxury. Flowing silk maxi dress with a delicate sheen for evening elegance.",
                price: 245,
                category: categories.women,
                countInStock: 45,
                images: [{ url: '/products/silk_dress.png', public_id: 'seed_uni_women_1' }],
                fabricType: "Pure Mulberry Silk",
                sizes: ["S", "M", "L"],
                colors: ["Midnight Black"],
                moq: "50 Pieces",
                exportCountries: ["Italy", "USA"]
            },
            {
                name: "Cream Cashmere Cardigan",
                description: "Unrivaled softness. Hand-finished cashmere knit for ultimate warmth and comfort.",
                price: 165,
                category: categories.women,
                countInStock: 60,
                images: [{ url: '/products/sweater.png', public_id: 'seed_uni_women_2' }],
                fabricType: "100% Cashmere",
                sizes: ["S", "M", "L"],
                colors: ["Cream"],
                moq: "100 Pieces",
                exportCountries: ["Switzerland", "UK"]
            },
            {
                name: "High-Waist Cotton Trousers",
                description: "Precisely cut for a flattering fit. Versatile trousers for the modern workspace.",
                price: 95,
                category: categories.women,
                countInStock: 140,
                images: [{ url: '/products/trousers.png', public_id: 'seed_uni_women_3' }],
                fabricType: "Premium Cotton Twill",
                sizes: ["XS", "S", "M", "L"],
                colors: ["Charcoal"],
                moq: "300 Pieces",
                exportCountries: ["Netherlands", "Sweden"]
            },
            {
                name: "Vibrant Summer Kaftan",
                description: "Hand-embroidered summer kaftan. Lightweight, breathable, and perfect for resort wear.",
                price: 125,
                category: categories.women,
                countInStock: 90,
                images: [{ url: '/products/kaftan.png', public_id: 'seed_uni_women_4' }],
                fabricType: "Fine Muslin Cotton",
                sizes: ["One Size"],
                colors: ["Teal / Gold"],
                moq: "200 Pieces",
                exportCountries: ["UAE", "Spain"]
            },
            {
                name: "Floral Silk Blouse",
                description: "Featuring an exclusive hand-painted floral print on luxurious silk de chine.",
                price: 135,
                category: categories.women,
                countInStock: 75,
                images: [{ url: '/src/assets/best-seller-3.png', public_id: 'seed_uni_women_5' }],
                fabricType: "Silk De Chine",
                sizes: ["S", "M", "L"],
                colors: ["Floral Print"],
                moq: "250 Pieces",
                exportCountries: ["USA", "France"]
            },

            // Kids Wear
            {
                name: "Classic Denim Dungarees",
                description: "Iconic and durable. Made from soft but tough denim for active little explorers.",
                price: 49,
                category: categories.kids,
                countInStock: 180,
                images: [{ url: '/products/dungarees.png', public_id: 'seed_uni_kids_1' }],
                fabricType: "Stay-Soft Denim",
                sizes: ["2T", "3T", "4T", "5T"],
                colors: ["Classic Blue"],
                moq: "1000 Pieces",
                exportCountries: ["Canada", "Australia"]
            },
            {
                name: "Organic Cotton Play Set",
                description: "Two-piece set made from certified organic cotton. Kind to skin and the planet.",
                price: 35,
                category: categories.kids,
                countInStock: 250,
                images: [{ url: '/products/tshirt_set.png', public_id: 'seed_uni_kids_2' }],
                fabricType: "GOTS Certified Organic Cotton",
                sizes: ["6M", "12M", "18M", "24M"],
                colors: ["Sage Green"],
                moq: "1500 Pieces",
                exportCountries: ["Germany", "UK"]
            },
            {
                name: "Pastel Party Dress",
                description: "Elegant tulle and cotton party dress for special occasions. Delicate embroidery details.",
                price: 59,
                category: categories.kids,
                countInStock: 110,
                images: [{ url: '/src/assets/kids-party-dress.png', public_id: 'seed_uni_kids_3' }],
                fabricType: "Tulle / Fine Cotton",
                sizes: ["3Y", "4Y", "5Y", "6Y"],
                colors: ["Lavender"],
                moq: "500 Pieces",
                exportCountries: ["Russia", "Israel"]
            },

            // Seasonal / Universal
            {
                name: "Mustard Cashmere Scarf",
                description: "Warmth without weight. Luxurious cashmere scarf in a vibrant autumnal hue.",
                price: 79,
                category: categories.women,
                countInStock: 200,
                images: [{ url: '/products/scarf.png', public_id: 'seed_uni_other_1' }],
                fabricType: "Inner Mongolian Cashmere",
                sizes: ["70 x 200 cm"],
                colors: ["Mustard"],
                moq: "400 Pieces",
                exportCountries: ["Norway", "Iceland"]
            },
            {
                name: "Unisex Puffer Jacket",
                description: "High-insulation, lightweight puffer jacket for extreme winter protection.",
                price: 155,
                category: categories.men,
                countInStock: 100,
                images: [{ url: '/products/puffer.png', public_id: 'seed_uni_other_2' }],
                fabricType: "Recycled Polyester / Down Fill",
                sizes: ["S", "M", "L", "XL"],
                colors: ["Slate Grey"],
                moq: "300 Pieces",
                exportCountries: ["Poland", "Finland"]
            }
        ];

        await Product.insertMany(newProducts);
        console.log(`Successfully added ${newProducts.length} UNIQUE high-quality products!`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUniqueProducts();
