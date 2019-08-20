const Sequelize = require("sequelize");
const db = require('../database/db');

module.exports = db.sequelize.define(
    'secuencia',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        paso:{
            type: Sequelize.INTEGER
        },
        secuencia:{
            type: Sequelize.INTEGER
        },
        createdAt:{
            type: Sequelize.DATE
        },
        updatedAt:{
            type: Sequelize.DATE
        }
    }
    
);