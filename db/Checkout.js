const Sequelize = require('sequelize');
const connection = require("./database");

const Checkout = connection.define('checkout',{
    ndeReserva:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    placadoCarro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    modeloCarro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    left:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tempo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pago:{
        type: Sequelize.STRING,
        allowNull: false
    }, 
    valorPago:{
        type: Sequelize.STRING,
        allowNull: false
    }
});


//Checkout.sync({force: false}).then(() => {});

module.exports = Checkout;