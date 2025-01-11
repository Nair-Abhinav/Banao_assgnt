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

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
