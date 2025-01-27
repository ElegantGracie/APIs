const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { registrationSchema, loginSchema } = require("../utils/validation");

const register = async (req, res) => {
    try {
        const validatedData = await registrationSchema.validate({...req.body, photo: req.file}, {abortEarly: false});

        const salt = await bcrypt.genSalt();

        const hashedPassword = await bcrypt.hash(validatedData.password, salt);

        const [user, newUser] = await User.findOrCreate({
            where: {
                email: validatedData.email
            },
            defaults: {
                firstName: validatedData.firstName, 
                lastName: validatedData.lastName, 
                otherName: validatedData.otherName, 
                photo: req.file?.path || null, 
                password: hashedPassword
            }
        });

        if(!newUser) {
            return res.status(400).json({success: false, message: "User already exists. Please login."});
        };

        return res.status(201).json({success: true, message: "Registered successfully.", user});
    } catch (error) {
        console.log("Error during user registration: ", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({success: false, error: error.errors });
        }
        return res.status(500).json({success: false, message: "Error during registration. Please try again."});
    }
};

const login = async (req, res) => {
    try {
        const validatedData = await loginSchema.validate(req.body, {abortEarly: false});
        
        const user = await User.findOne({where: {email: validatedData.email}});
        if(!user) res.status(400).json({success: false, message: "User does not exist. Please register"});

        const validPassword = await bcrypt.compare(validatedData.password, user.password);
        if(!validPassword) res.status(400).json({success: false, message: "Invalid password"});

        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: "1day"});

        return res.status(200).json({success: true, message: "Logged in successfully.", token});
    } catch (error) {
        console.log("Error during user login: ", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({success: false, error: error.errors });
        }
        return res.status(500).json({success: false, message: "Error during login. Please try again."});
    }
}

module.exports = {
    register,
    login
}