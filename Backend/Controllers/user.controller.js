const User = require('../Models/user.model');
const {validationResult} = require('express-validator'); 
const userService = require('../Service/user.service');
const blackListTokenModel = require('../Models/blacklistToken.model');

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
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out' });
}