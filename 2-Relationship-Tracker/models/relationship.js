const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const User = require("./user");
const Memory = require("./memory");
const Reminder = require("./reminder");
const Media = require("./media");
const Partner = require("./partner");

const Relationship = sequelize.define("Relationship", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    user: {
        type: Sequelize.UUID,
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

// Relationship.belongsTo(User, {foreignKey: "user"});
// Relationship.hasMany(Memory, {foreignKey: "relationship"});
// Relationship.hasMany(Reminder, {foreignKey: "relationship"});
// Relationship.hasMany(Media, {foreignKey: "relationship"});
// Relationship.hasMany(Partner, {foreignKey: "relationship"});

module.exports = Relationship;