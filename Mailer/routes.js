const express = require('express');
const { validators, receiveMail } = require('./controller');
const router = express.Router();

router
    .post('/contact-us', validators.receiveMailValidator, receiveMail)
    // .post('/newsletter', sendMail);

module.exports = router;