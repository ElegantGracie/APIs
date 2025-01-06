const Sequelize = require('sequelize')
const { sequelize } = require('../config/connections')

const Gamer = sequelize.define('gamer', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gamerName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
})

sequelize.sync()

module.exports = { Gamer }