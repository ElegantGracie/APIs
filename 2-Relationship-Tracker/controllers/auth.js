const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { registrationSchema } = require("../utils/validation");

const register = async (req, res) => {
    try {
        const validatedData = await registrationSchema.validate({...req.body, photo: req.file}, {abortEarly: false});

        const hashedPassword = bcrypt.hashSync(validatedData.password, 10);

        const [user, newUser] = await User.findOrCreate({
            where: {
                email: validatedData.email
            },
            defaults: {
                firstName: validatedData.firstName, 
                lastName: validatedData.lastName, 
                otherName: validatedData.otherName, 
                photo: req.file.path, 
                password: hashedPassword
            }
        });

        if(user) {
            return res.status(400).json({success: false, message: "User already exists. Please login."});
        };

        const token = jwt.sign({id: newUser.id}, process.env.SECRET_KEY, {expiresIn: "1day"});

        return res.status(201).json({success: true, message: "Registered successfully.", token})
    } catch (error) {
        console.log("Error during user registration: ", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({success: false, message: "Error during registration. Please try again."});
    }
}

module.exports = {
    register
}