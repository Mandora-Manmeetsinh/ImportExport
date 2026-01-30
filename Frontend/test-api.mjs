import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

async function testEndpoints() {
    console.log('--- Starting API Functionality Check (ESM) ---');

    // 1. Check Products
    try {
        const res = await axios.get(`${BASE_URL}/products`);
        console.log('✅ GET /products:', res.status, `(Found ${res.data.length} products)`);
    } catch (err) {
        console.log('❌ GET /products failed:', err.message);
    }

    // 2. Check Categories
    try {
        const res = await axios.get(`${BASE_URL}/categories`);
        console.log('✅ GET /categories:', res.status, `(Found ${res.data.length} categories)`);
    } catch (err) {
        console.log('❌ GET /categories failed:', err.message);
    }

    // 3. Check Settings (Public)
    try {
        const res = await axios.get(`${BASE_URL}/settings`);
        console.log('✅ GET /settings:', res.status);
    } catch (err) {
        console.log('❌ GET /settings failed:', err.message);
    }

    // 4. Try Admin Seed if needed
    try {
        const res = await axios.get('http://localhost:5000/api/seed-admin');
        console.log('ℹ️ Admin Seed Check:', res.data);
    } catch (err) {
        console.log('❌ Admin Seed Check failed:', err.message);
    }

    console.log('--- API Check Complete ---');
}

testEndpoints();
