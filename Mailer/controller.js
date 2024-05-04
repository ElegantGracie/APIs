const nodemailer = require('nodemailer');
const { validateRequest, receiveMailOptions, isTemporaryEmail } = require('./utils/helpers');
const { body } = require('express-validator');


let transport = () => nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    // service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    }
});

const receiveMail = async(req, res) => {
    const {
        email, 
        fullName, 
        company, 
        phone, 
        country, 
        reason, 
        message
    } = req.body;

    try{
        validateRequest(req);

        if(isTemporaryEmail(email)) {
            return res.status(400).send({message: "Invalid email provider, please provide another email"});
        }
        
        // send mail with defined transport object
        let mailOptions = receiveMailOptions(email, fullName, phone, company, country, reason, message);

        await transport().sendMail(mailOptions);

        console.log("Email sent");
        return res.status(200).send({message:"Your message has been sent"});
    }catch(err){
        console.error(err);
        if (err.status !== 500) return res.status(err.status).send(err);

        return res.status(500).send({message:`Server error occured while trying to send email`});
    }
};

const validators = {
    receiveMailValidator: [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Please enter a valid email address")
            .notEmpty()
            .withMessage("Email must be provided"),
        body("fullName")
            .optional()
            .trim()
            .isString()
            .withMessage("Name must be a string."),
        body("reason")
            .notEmpty()
            .withMessage("Reason must be provided."),
        body("message")
            .notEmpty()
            .withMessage("Message cannot be empty."),
        body("company")
            .optional()
            .isString()
            .withMessage("Company must be a string"),
        body("phone")
            .optional()
            .isString()
            .withMessage("Phone number is invalid."),
        body("country")
            .optional()
            .isString()
            .withMessage("Country is not valid")  
    ]
}

module.exports={
    receiveMail,
    validators
};