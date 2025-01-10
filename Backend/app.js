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
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api',userRoutes);

module.exports = app;