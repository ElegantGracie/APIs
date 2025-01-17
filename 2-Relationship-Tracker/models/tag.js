const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const User = require("./user");
const Memory = require("./memory");

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
        }
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

// Tag.belongsTo(User, {foreignKey: "user"});
// Tag.hasMany(Memory, {foreignKey: "tag"});

module.exports = Tag;