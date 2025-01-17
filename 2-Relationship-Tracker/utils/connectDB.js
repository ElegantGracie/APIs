const Sequelize = require('sequelize')
const path = require('path')

const sequelize = new Sequelize({
    dialect: 'sqlite', 
    storage: path.join(__dirname, '../database/database.sqlite'),
    logging: false
})

sequelize.authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = { sequelize }