const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../Controllers/user.controller');
const authMiddleware = require('../Middlewares/authUser.middleware');

// Register User
router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
);

// Login User
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
);

// Forgot Password
router.post('/forgotpassword', [
    body('email').isEmail().withMessage('Invalid Email'),
], userController.forgotPassword);

// Reset Password
router.post('/resetpassword', [
    body('token').not().isEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.resetPassword);

// Get User Profile
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

// Logout User
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
