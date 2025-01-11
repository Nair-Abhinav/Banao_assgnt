const User = require('../Models/user.model');
const { validationResult } = require('express-validator');
const userService = require('../Services/user.service');
const blackListTokenModel = require('../Models/blackListToken.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;
const RESET_PASSWORD_TOKEN_EXPIRY = "1h"; 

// Register User
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await User.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await userService.createUser({
        name,
        email,
        password: hashedPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
};

// Login User
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
};

// Get User Profile
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

// Logout User
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Generate reset token
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' }); // Token valid for 15 minutes

        // Respond with the reset token for testing purposes
        res.status(200).json({
            message: 'Password reset token generated successfully.',
            resetToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating reset token. Please try again later.' });
    }
};


// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'Invalid token or user not found.' });
        }

        // Hash the new password and save it
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid or expired token. Please request a new password reset.' });
    }
};
