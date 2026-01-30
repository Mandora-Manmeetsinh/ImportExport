const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');

dotenv.config();

const seedProducts = async () => {
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

        const newProducts = [];

        // Men's Wear (10)
        const menImages = [
            '/src/assets/mens-linen-shirt.png',
            '/src/assets/mens-chinos.png',
            '/src/assets/mens-blazer.png',
            '/src/assets/best-seller-2.png',
            '/src/assets/best-seller-4.png'
        ];
        const menNames = [
            "Premium Linen Shirt - Sky Blue", "Classic Cotton Chinos - Khaki", "Tailored Wool Blazer - Navy",
            "Oxford Button-Down - Pure White", "Slim Fit Denim - Indigo", "Athletic Polo - Forest Green",
            "Business Formal Shirt - Striped", "Casual Summer Shorts - Beige", "Technical Trekking Vest", "Egyptian Cotton V-Neck"
        ];

        for (let i = 0; i < 10; i++) {
            newProducts.push({
                name: menNames[i],
                description: `High-quality ${menNames[i]} designed for export markets. Premium fabric and craftsmanship since 2010.`,
                price: 45 + (i * 5),
                category: categories.men,
                countInStock: 100 + (i * 10),
                images: [{ url: menImages[i % menImages.length], public_id: `seed_men_${i}` }],
                fabricType: "Premium Cotton / Linen",
                sizes: ["S", "M", "L", "XL"],
                colors: ["Navy", "White", "Beige", "Black"],
                moq: "500 Pieces",
                exportCountries: ["USA", "UK", "Germany", "UAE"],
                isFeatured: i < 3
            });
        }

        // Women's Wear (10)
        const womenImages = [
            '/src/assets/womens-silk-dress.png',
            '/src/assets/womens-sweater.png',
            '/src/assets/womens-trousers.png',
            '/src/assets/seasonal-kaftan.png',
            '/src/assets/best-seller-1.png',
            '/src/assets/best-seller-3.png'
        ];
        const womenNames = [
            "Midnight Silk Wrap Dress", "Cashmere Blend Cardigan", "High-Waist Tailored Trousers",
            "Embroidered Beach Kaftan", "Floral Summer Maxi", "Structured Satin Blazer",
            "Pleated Midi Skirt", "Lace Trimmed Blouse", "Luxury Knit Jumper", "Crepe De Chine Tunic"
        ];

        for (let i = 0; i < 10; i++) {
            newProducts.push({
                name: womenNames[i],
                description: `Elegant ${womenNames[i]} ethically manufactured for global boutiques. Superior finish and design.`,
                price: 55 + (i * 8),
                category: categories.women,
                countInStock: 80 + (i * 5),
                images: [{ url: womenImages[i % womenImages.length], public_id: `seed_women_${i}` }],
                fabricType: "Silk / Cashmere / Fine Cotton",
                sizes: ["XS", "S", "M", "L"],
                colors: ["Emerald", "Cream", "Black", "Rose"],
                moq: "300 Pieces",
                exportCountries: ["France", "Italy", "USA", "Japan"],
                isFeatured: i < 4
            });
        }

        // Kids Wear (10)
        const kidsImages = [
            '/src/assets/kids-dungarees.png',
            '/src/assets/kids-tshirt-set.png',
            '/src/assets/kids-party-dress.png',
            '/src/assets/about-garments.jpg'
        ];
        const kidsNames = [
            "Durable Denim Dungarees", "Organic Cotton Tee Set", "Silk Party Dress - Pastel",
            "Hooded Puffer Vest", "Playroom Sweatsuit", " Embroidered Occasion Wear",
            "Striped Breton Top", "Cotton Drill Cargo Shorts", "Quilted Winter Jacket", "Graphic Logo Tee"
        ];

        for (let i = 0; i < 10; i++) {
            newProducts.push({
                name: kidsNames[i],
                description: `Comfortable and durable ${kidsNames[i]} for children. Non-toxic dyes and high safety standards.`,
                price: 25 + (i * 3),
                category: categories.kids,
                countInStock: 150 + (i * 20),
                images: [{ url: kidsImages[i % kidsImages.length], public_id: `seed_kids_${i}` }],
                fabricType: "100% Organic Cotton",
                sizes: ["2T", "3T", "4T", "5T"],
                colors: ["Red", "Blue", "Green", "Pink"],
                moq: "1000 Pieces",
                exportCountries: ["Canada", "Australia", "UK", "Netherlands"],
                isFeatured: i < 2
            });
        }

        await Product.insertMany(newProducts);
        console.log(`Successfully added ${newProducts.length} new products!`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedProducts();
