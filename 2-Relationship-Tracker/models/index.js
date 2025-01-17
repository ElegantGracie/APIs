const Media = require("./media");
const Memory = require("./memory");
const Partner = require("./partner");
const Relationship = require("./relationship");
const Reminder = require("./reminder");
const Tag = require("./tag");
const User = require("./user");

// User model associations
User.hasMany(Relationship, {foreignKey: 'user'});
User.hasMany(Reminder, {foreignKey: 'user'});
User.hasMany(Media, {foreignKey: 'user'});
User.hasMany(Tag, {foreignKey: 'user'});
User.hasMany(Memory, {foreignKey: 'user'});
User.hasMany(Partner, {foreignKey: 'user'});

// Tag associations
Tag.belongsTo(User, {foreignKey: "user"});
Tag.hasMany(Memory, {foreignKey: "tag"});

// Reminder association
Reminder.belongsTo(User, { foreignKey: "user" });
Reminder.belongsTo(Relationship, { foreignKey: "relationship" });
Reminder.belongsTo(Memory, { foreignKey: "memory" });

// Relationship associations
Relationship.belongsTo(User, {foreignKey: "user"});
Relationship.hasMany(Memory, {foreignKey: "relationship"});
Relationship.hasMany(Reminder, {foreignKey: "relationship"});
Relationship.hasMany(Media, {foreignKey: "relationship"});
Relationship.hasMany(Partner, {foreignKey: "relationship"});

// Partner associations
Partner.belongsTo(User, { foreignKey: 'user' });
Partner.belongsTo(Relationship, { foreignKey: 'relationship' });

// Memory associations
Memory.belongsTo(Relationship, {foreignKey: 'relationship'});
Memory.belongsTo(User, {foreignKey: 'user'});
Memory.hasMany(Media, {foreignKey: 'memory'});
Memory.belongsTo(Tag, {foreignKey: 'tag'});

// Media associations
Media.belongsTo(User, {foreignKey: "user"});
Media.belongsTo(Relationship, {foreignKey: "relationship"});
Media.belongsTo(Memory, {foreignKey: "memory"});

module.exports = {
    User,
    Relationship,
    Reminder,
    Partner,
    Memory,
    Media,
    Tag    
}