const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chat = sequelize.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    receiverUserId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    msgFile: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Chat;