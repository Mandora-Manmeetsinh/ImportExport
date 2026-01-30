const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const Admin = require('./models/Admin');

// Connect to Database
connectDB().then(async () => {
  // Seed admin user if not exists
  const adminExists = await Admin.findOne({ email: 'admin@elitewear.com' });
  if (!adminExists) {
    await Admin.create({
      name: 'Admin User',
      email: 'admin@elitewear.com',
      password: 'admin123',
    });
    console.log('Default admin user created');
  }
});


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));


app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/seed-admin', async (req, res) => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@elitewear.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Admin User',
        email: 'admin@elitewear.com',
        password: 'admin123',
      });
      res.send('Default admin user created');
    } else {
      res.send('Admin already exists');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

