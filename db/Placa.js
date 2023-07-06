const Sequelize = require('sequelize');
const connection = require("./database");

const Placa = connection.define('Placa',{
    placadoCarro:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});



//Placa.sync({force: false}).then(() => {});

module.exports = Placa;