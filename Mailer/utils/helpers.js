const { validationResult } = require("express-validator");
const CustomError = require("./error");

const validateRequest = (req) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()) {
        throw new CustomError(422, 'Validation failed', validationErrors.mapped());
    }
}

const receiveMailOptions = (email, fullName, phone, company, country, reason, message) => {
    let body = `
    <h3>Hello!</h3>
    <p>${fullName ? `I am ${fullName}` : ""} ${country ? `from ${country}` : ""}. ${company ? `My company name is  ${company}.` : ""}</p>
    <p>Message: ${message}.</p>
    <br />
    <p>You can email me at ${email} ${phone ? `or call ${phone}` : ""}.</p>`

    return {
        body,
        subject: reason,
        to: email,
        html: body,
        from: process.env.USER
    }
}

const isTemporaryEmail = (email) => {
    const temporaryEmailProviders = [
        'yopmail.com',
        'guerrillamail.com',
        'tempmail.com',
        'mailinator.com',
        '10minutemail.com',
        'burnermail.io',
        'fakemailgenerator.com',
        'maildrop.cc',
        'getnada.com',
        'dispostable.com',
        'throwawaymail.com',
        'tempail.com',
        'mytemp.email',
        'mailnesia.com',
        'mailcatch.com',
        'mailnull.com',
        'moakt.com',
        'inboxalias.com',
        'spamgourmet.com',
        'anonemail.net',
    ];

    const domain = email.split('@')[1];
    return temporaryEmailProviders.some(provider => domain === provider);
}

module.exports = {
    validateRequest,
    receiveMailOptions,
    isTemporaryEmail,
};