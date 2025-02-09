const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const User = require("./user");

const Relationship = sequelize.define("Relationship", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    user: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: "id"
        },
        onDelete: "CASCADE",
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM("friend", "family", "colleague", "romantic", "other"),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("active", "pending", "inactive"),
        defaultValue: "active",
        allowNull: false
    },
    start: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    end: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
});

module.exports = Relationship;