const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const User = require("./user");
const Relationship = require("./relationship");
const Memory = require("./memory");

const Media = sequelize.define("Media", {
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
    mediaType: {
        type: Sequelize.ENUM('image', 'video'),
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
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
    memory: {
        type: Sequelize.UUID,
        references: {
            model: Memory,
            key: "id"
        },
        onDelete: "CASCADE",
    }
});

// Media.belongsTo(User, {foreignKey: "user"});
// Media.belongsTo(Relationship, {foreignKey: "relationship"});
// Media.belongsTo(Memory, {foreignKey: "memory"});

module.exports = Media;