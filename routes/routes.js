const express = require('express');
const router = express.Router();
const estacionamentoController = require('../controllers/estacionamentoController');
const loginController = require("../controllers/loginController");
const adminAuth = require("../middlewares/autenticador");


//Login
router.get("/login/",loginController.page); // Rota para renderizar página de Login
router.post("/auth/", loginController.auth); //Autenticação do Login
router.get("/logout/", adminAuth , loginController.logout); //Rota para fazer logout
router.get("/user/create/", adminAuth, loginController.createUser); // Rota para renderizar página de criar usuário
router.post("/user/create/new/", adminAuth, loginController.registerUser); // Rota para registrar novo usuário

// Define as rotas do estacionamento
router.get("/", adminAuth, estacionamentoController.home); // Rota para a página inicial
router.get("/checkin/", adminAuth, estacionamentoController.checkin); // Rota para a página de checkin
router.post("/savecheckin/", adminAuth, estacionamentoController.savecheckin); // Rota para salvar o checkin
router.get("/estacionamento/", adminAuth, estacionamentoController.estacionamento); // Rota para a página de estacionamento
router.post("/pagar/", adminAuth, estacionamentoController.pagar); // Rota para pagar o estacionamento
router.get("/estacionamento/checkout/", adminAuth, estacionamentoController.checkout); // Rota para a página de checkout
router.post("/rcheckout/", adminAuth, estacionamentoController.rcheckout); // Rota para o checkout
router.get("/historico/:placadoCarro/", adminAuth, estacionamentoController.historico); // Rota para o histórico
router.get("/historico/", adminAuth, estacionamentoController.pesquisa);

// Exporta o router para uso no aplicativo
module.exports = router;
