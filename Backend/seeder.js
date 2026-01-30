const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const Category = require('./models/Category');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Admin.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();

        const adminUser = {
            name: 'Admin User',
            email: 'admin@elitewear.com',
            password: 'admin123',
        };
        await Admin.create(adminUser);

        const categories = await Category.insertMany([
            { name: "Men's Wear", description: "Premium men's clothing" },
            { name: "Women's Wear", description: "Elegant women's apparel" },
            { name: "Kids Wear", description: "Comfortable kids clothing" },
            { name: "Fabrics", description: "High-quality industrial fabrics" },
            { name: "Seasonal Collections", description: "Limited edition seasonal wear" }
        ]);

        const products = [
            {
                name: "Premium Cotton Men's Shirt",
                description: "A high-quality 100% cotton shirt designed for comfort and style. Perfect for formal and semi-formal occasions.",
                price: 25.99,
                category: categories[0]._id,
                countInStock: 500,
                isFeatured: true,
                fabricType: "100% Organic Cotton",
                sizes: ["S", "M", "L", "XL", "XXL"],
                colors: ["White", "Light Blue", "Navy", "Black"],
                moq: "100 units",
                packingDetails: "Individually poly-packed, 50 units per master carton",
                exportCountries: ["USA", "UK", "Germany", "UAE"],
                images: [
                    { url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", public_id: "shirt1" },
                    { url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", public_id: "shirt2" }
                ],
                video: { url: "https://res.cloudinary.com/demo/video/upload/v1631234567/sample_video.mp4", public_id: "sample_v" }
            },
            {
                name: "Summer Floral Women's Dress",
                description: "Breathable and stylish floral dress for the summer season. Made with premium rayon fabric.",
                price: 35.50,
                category: categories[1]._id,
                countInStock: 300,
                isFeatured: true,
                fabricType: "Premium Rayon",
                sizes: ["XS", "S", "M", "L"],
                colors: ["Floral Pink", "Floral Blue", "Yellow"],
                moq: "50 units",
                packingDetails: "Hanger packed with protective cover, 25 units per carton",
                exportCountries: ["France", "Italy", "Spain", "Australia"],
                images: [
                    { url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", public_id: "dress1" },
                    { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", public_id: "dress2" }
                ]
            },
            {
                name: "Kids Denim Jacket",
                description: "Durable and trendy denim jacket for kids. Reinforced stitching for long-lasting wear.",
                price: 19.99,
                category: categories[2]._id,
                countInStock: 200,
                isFeatured: false,
                fabricType: "Stretch Denim",
                sizes: ["2T", "3T", "4T", "5-6Y", "7-8Y"],
                colors: ["Classic Blue", "Dark Wash"],
                moq: "200 units",
                packingDetails: "Flat packed, 40 units per carton",
                exportCountries: ["Canada", "USA", "UK"],
                images: [
                    { url: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", public_id: "kids1" }
                ]
            }
        ];

        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
