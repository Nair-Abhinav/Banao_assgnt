const express = require('express');
const router = express.Router();
const {body} = require('express-validator')
const userController = require('../Controller/user.controller');
const authMiddleware = require('../Middleware/authUser.middleware');

router.post('/register', [
    body('name').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.patch('/forgotpassword', userController.forgotPassword)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, adminController.logoutAdmin)


module.exports = router;
