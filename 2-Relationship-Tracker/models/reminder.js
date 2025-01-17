const Sequelize = require("sequelize");
const { sequelize } = require("../utils/connectDB");
const Memory = require("./memory");
const User = require("./user");
const Relationship = require("./relationship");

const Reminder = sequelize.define("Reminder", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    },
    user: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: "id"
        },
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    reminderType: {
        type: Sequelize.ENUM('daily', 'weekly', 'monthly', 'yearly'),
        defaultValue: 'daily'
    },
    remindAt: {
        type: Sequelize.TIME,
    },
    relationship: {
        type: Sequelize.UUID,
        references: {
            model: Relationship,
            key: "id"
        },
        allowNull: false
    },
    memory: {
        type: Sequelize.UUID,
        references: {
            model: Memory,
            key: "id"
        }
    }
});

// Reminder.belongsTo(User, { foreignKey: "user" });
// Reminder.belongsTo(Relationship, { foreignKey: "relationship" });
// Reminder.belongsTo(Memory, { foreignKey: "memory" });

module.exports = Reminder;