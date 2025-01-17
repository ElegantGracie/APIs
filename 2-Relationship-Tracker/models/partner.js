const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const Relationship = require("./relationship");
const User = require("./user");

const Partner = sequelize.define("Partner", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    firstName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    otherName: {
        type: Sequelize.STRING(50), 
    },
    email: {
        type: Sequelize.STRING(100)
    },
    user: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    },
    relationship: {
        type: Sequelize.UUID,
        references: {
            model: Relationship,
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
    }
});

// Partner.belongsTo(User, { foreignKey: 'user' });
// Partner.belongsTo(Relationship, { foreignKey: 'relationship' });

module.exports = Partner;