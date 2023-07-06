const Sequelize = require('sequelize');
const connection = require("./database");

const Historico = connection.define('Historico',{
    ndeReserva:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    placadoCarro:{
        type: Sequelize.STRING,
        allowNull: false,
        primarykey: true
    },
    tempo:{
        type: Sequelize.STRING,
        allowNull: false
    },pago:{
        type: Sequelize.STRING,
        allowNull: false
    },
    left:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valorPago:{
        type: Sequelize.STRING,
        allowNull: false
    }
});



//Historico.sync({force: false}).then(() => {});

module.exports = Historico;