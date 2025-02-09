const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const Relationship = require("./relationship");
const User = require("./user");
const Tag = require("./tag");

const Memory = sequelize.define("Memory", {
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
    relationship: {
        type: Sequelize.UUID,
        references: {
            model: Relationship,
            key: "id"
        },
        onDelete: "CASCADE",
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING
    },
    tag: {
        type: Sequelize.INTEGER,
        references: {
            model: Tag,
            key: "id"
        },
        onDelete: "CASCADE",
        allowNull: false
    }
});

module.exports = Memory;