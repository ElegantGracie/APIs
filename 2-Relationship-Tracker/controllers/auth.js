const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { registrationSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } = require("../utils/validation");
const transporter = require("../utils/mailTransport");

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

const forgotPassword = async (req, res) => {
    try {
        const validatedData = await forgotPasswordSchema.validate(req.body, {abortEarly: false});

        const user = await User.findOne({where: {email: validatedData.email}});
        if(!user) res.status(400).json({success: false, message: "User does not exist. Please register"});

        const resetToken = jwt.sign({email: user.email}, process.env.SECRET_KEY, {expiresIn: "1h"});

        const resetPasswordUrl = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

        const html = `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Password</title>
        </head>
        <body>
            <h4> Hi ${user.firstName}!</h4>
            <p>You made a request to reset your password. Kindly click <a href="${resetPasswordUrl}">here</a> to reset your password. This link expires in an hour.</p> </br>If you did not make this request, please ignore this email.</p>
            <p>Best regards, <br> Tracker Team.</p>
        </body>
        </html>`;

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: user.email,
            subject: "Reset Password",
            html
        });

        return res.status(200).json({success: true, message: "Password reset email sent successfully."});
    } catch (error) {
        console.log("Error during forgot password: ", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({success: false, error: error.errors });
        } else if(error.name === "TokenExpiredError") {
            return res.status(400).json({success: false, message: "Token has expired. Please try again."});
        }

        return res.status(500).json({success: false, message: "Error during forgot password. Please try again."});
    }
};

const resetPassword = async (req, res) => {
    try {
        const validatedData = await resetPasswordSchema.validate(req.body, {abortEarly: false});

        const {token, newPassword} = validatedData;

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findOne({where: {email: decoded.email}});
        if(!user) res.status(400).json({success: false, message: "User does not exist. Please register"});

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({success: true, message: "Password reset successfully."});
    } catch (error) {
        console.log("Error during reset password: ", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({success: false, error: error.errors });
        }

        return res.status(500).json({success: false, message: "Error during reset password . Please try again."});
    }
}

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
}