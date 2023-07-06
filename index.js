const express = require('express');
const app = express();
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require("path");
const session = require("express-session");


var handle = exphbs.create({
  defaultLayout: 'main'
});

// Configurações
// --------------------------

//Session
app.use(session({
  secret:"Tessalonicenses",
  cookie: {maxAge: 30000000},
  resave: false,
  saveUninitialized: false
})); 

//templates
app.engine('handlebars', handle.engine);
app.set('view engine', 'handlebars');

// Conexão com o banco de dados
const connection = require("./db/database");
connection.authenticate().then(() => {
  console.log("Conexão feita com o BD");
}).catch((msgErro) => {
  console.log(msgErro);
});

// Configuração do Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração dos arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configuração das rotas
app.use(router);


// Inicialização do servidor
app.listen(8080, () => {
  console.log("App rodando");
});