const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const seedUploadedProducts = async () => {
    try {
        const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')
            ? process.env.MONGO_URI
            : 'mongodb://127.0.0.1:27017/import-export';

        await mongoose.connect(uri);

        const categories = {
            women: "697c41161733b1b553a807ec",
            kids: "697c41161733b1b553a807ed"
        };

        const uploadProducts = [
            {
                name: "Girl's Crimson Party Dress",
                description: "A vibrant crimson red dress with delicate frill details, perfect for special occasions and export quality standards.",
                price: 45,
                category: categories.kids,
                countInStock: 100,
                images: [{ url: '/products/user_kids_red_dress.jpg', public_id: 'user_upload_kids_1' }],
                fabricType: "Soft Eyelet Cotton",
                sizes: ["2T", "4T", "6Y"],
                colors: ["Crimson Red"],
                moq: "500 Pieces",
                exportCountries: ["Europe", "Middle East"]
            },
            {
                name: "Kids Ethnic Printed Set",
                description: "Traditional printed green tunic with matching trousers. Comfortable organic cotton blend for long-wear comfort.",
                price: 35,
                category: categories.kids,
                countInStock: 80,
                images: [{ url: '/products/user_kids_green_set.jpg', public_id: 'user_upload_kids_2' }],
                fabricType: "Block Printed Cotton",
                sizes: ["S", "M", "L"],
                colors: ["Mint Green"],
                moq: "400 Pieces",
                exportCountries: ["India", "Global"]
            },
            {
                name: "Midnight Floral Smocked Dress",
                description: "Elegant monochrome floral dress with smocked bodice and puff sleeves. A versatile piece for international boutiques.",
                price: 65,
                category: categories.women,
                countInStock: 50,
                images: [{ url: '/products/user_womens_black_floral.jpg', public_id: 'user_upload_women_1' }],
                fabricType: "Viscose Rayon",
                sizes: ["XS", "S", "M", "L"],
                colors: ["Black/White"],
                moq: "200 Pieces",
                exportCountries: ["USA", "UK"]
            },
            {
                name: "Essential V-Neck Pink Tee",
                description: "Premium cotton V-neck tee in a soft rose pink. Essential wardrobe staple for everyday luxury.",
                price: 25,
                category: categories.women,
                countInStock: 200,
                images: [{ url: '/products/user_womens_pink_vneck.jpg', public_id: 'user_upload_women_2' }],
                fabricType: "Pima Cotton Blend",
                sizes: ["S", "M", "L", "XL"],
                colors: ["Rose Pink"],
                moq: "1000 Pieces",
                exportCountries: ["Global"]
            },
            {
                name: "Designer Floral Ethnic Ensemble",
                description: "Exquisite three-piece ethnic wear in sage green with coral floral prints and a contrasting dupatta.",
                price: 110,
                category: categories.women,
                countInStock: 30,
                images: [{ url: '/products/user_womens_ethnic_set.jpg', public_id: 'user_upload_women_3' }],
                fabricType: "Premium Chanderi Silk",
                sizes: ["M", "L", "XL"],
                colors: ["Sage Green / Coral"],
                moq: "100 Pieces",
                exportCountries: ["UAE", "Singapore", "Canada"]
            }
        ];

        await Product.insertMany(uploadProducts);
        console.log(`Successfully integrated ${uploadProducts.length} new user-uploaded products!`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUploadedProducts();
