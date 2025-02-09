const Sequelize = require('sequelize');
const { sequelize } = require('../utils/connectDB');

const User = sequelize.define("User", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    otherName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    googleId: { // to be implemented for google login
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    facebookId: { // to be implemented for facebook login
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = User;