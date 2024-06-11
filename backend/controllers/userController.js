import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import 'dotenv/config.js';

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
 
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: "User don't exists" });
        // check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        // create and sign json web token
        const token = createToken(user._id);
        res.json({ success: true, token, username: user.name });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error Server' });
    }
};
// create Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // expire in one hour
};
// register new user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // check if user exist
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }
        // validate email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(401).json({ success: false, error: 'Please enter a valid email' });
        }

        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            res.json({
                success: false,
                error: 'Please enter a strong password with at least 8 characters including both letters and numbers',
            });
        }

        // Hashing User password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });
        // save the user to database
        const user = await newUser.save();
        const token = createToken(user._id);
        // return response with token
        res.json({ success: true, token, username: user.name }); // Ajoutez le nom de l'utilisateur ici
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error server' });
    }
};

export { loginUser, registerUser };
