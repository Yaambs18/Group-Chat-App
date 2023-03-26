const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const GroupMembers = sequelize.define('groupMembers', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = GroupMembers;