const Sequelize = require('sequelize');

const connection = new Sequelize('estacionamento','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    query:{raw:true}
});

module.exports = connection;