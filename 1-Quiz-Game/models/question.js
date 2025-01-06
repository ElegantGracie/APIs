const Sequelize = require('sequelize');
const { sequelize } = require('../config/connections');

const Question = sequelize.define('question', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  options: {
    type: Sequelize.JSON,
    allowNull: false
  },
  answer: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM,
    values: ["general knowledge", "music", "geography", "science", "current affairs", ],
    allowNull: false,
  },
});

sequelize.sync()

module.exports = { Question };
