const Admin = require('../Models/user.model');
module.exports.createUser = async ({
    name,email,password
}) => {
    if (!name || !stud_id || !email || !password) {
        throw new Error('All fields are required');
    }
    console.log("Creating user with:", { name,email,password});
    const user = new User({
        name,
        email,
        password
    });
    const savedUser = await user.save();
    console.log("Admin created:", savedUser);
    return savedUser;
};
