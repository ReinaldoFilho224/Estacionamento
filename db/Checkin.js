const Sequelize = require('sequelize');
const connection = require("./database");

const Checkin = connection.define('Checkin',{
    placadoCarro:{
        type: Sequelize.STRING,
        allowNull: false,
        primarykey: true
    },
    modeloCarro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    left:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pago:{
        type: Sequelize.STRING,
        allowNull: false
    }
});



//Checkin.sync({force: false}).then(() => {});

module.exports = Checkin;