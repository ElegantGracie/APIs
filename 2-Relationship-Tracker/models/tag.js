const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const User = require("./user");

const Tag = sequelize.define("Tag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: false
});

module.exports = Tag;