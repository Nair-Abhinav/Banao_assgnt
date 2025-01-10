const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./DB/db.DB');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/user.routes');

// db call
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);

// Add error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = app;