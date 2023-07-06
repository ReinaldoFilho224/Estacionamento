// Importar os models necessários
const Checkin = require('../db/Checkin');
const Historico = require('../db/Historico');
const Checkout = require('../db/Checkout');
const Placa = require('../db/Placa');
const moment = require('moment');

// Função para renderizar a página inicial
exports.home =  (req, res) => {
  res.render("./estacionamento/home", {});
};

// Função para renderizar a página de check-in
exports.checkin = (req, res) => {
  res.render("estacionamento/checkin", {});
};

// Função para salvar os dados do check-in no banco de dados
exports.savecheckin = async (req, res) => {
  var vplaca = req.body.placa;
  var vmodelo = req.body.modelo;

  await Checkin.create({
    placadoCarro: vplaca,
    modeloCarro: vmodelo,
    pago: "false",
    left: "true"
  });

  await Placa.create({
    placadoCarro: vplaca
  }).then((result) => {
    res.redirect("/estacionamento");
  })
  .catch((error) => {
    res.redirect("/estacionamento");
  });
};

// Função para renderizar a página
exports.estacionamento = async (req, res) => {
  const dados = await Checkin.findAll();
  res.render('estacionamento/estacionamento', { posts: dados });
};

// Função para registrar o pagamento de um carro que está saindo do estacionamento
exports.pagar = async (req, res) => {
  var idbutton = req.body.pagar;

  await Checkout.update({
    pago: "true"
  },
    { where: { id: idbutton } }
  );

  const dados = await Checkout.findOne({ where: { id: idbutton } });

  // Criar um registro no histórico para o carro que acabou de sair
  await Historico.create({
    ndeReserva: dados.ndeReserva,
    placadoCarro: dados.placadoCarro,
    tempo: dados.tempo,
    pago: dados.pago,
    left: "false",
    valorPago: dados.valorPago
  });

  // Remover o registro do check-out do banco de dados
  await Checkout.destroy({ where: { 'id': idbutton } });

  res.redirect("/estacionamento");
};

// Função para renderizar a página de check-out
exports.checkout = async (req, res) => {
  const dados = await Checkout.findAll();
  res.render('estacionamento/checkout', { posts: dados });
};

// Função para registrar a saída de um carro do estacionamento
exports.rcheckout = async (req, res) => {
  var idbutton = req.body.Checkout;

  const dados = await Checkin.findOne({ where: { id: idbutton } });

  const now = moment();
  const datain = moment(dados.createdAt, 'YYYY-MM-DD HH:mm:ss');
  const datasa = moment(now, 'YYYY-MM-DD HH:mm:ss');
  const diffInMinutes = datasa.diff(datain, 'minutes');
  const valorPago = diffInMinutes * 0.166666667;
  const valorArredondado = valorPago.toFixed(2);
  const valorFormatado = `R$ ${valorArredondado.replace(".", ",")}`;


  // Criar um registro no check-out para o carro que está saindo
  await Checkout.create({
    ndeReserva: dados.id,
    placadoCarro: dados.placadoCarro,
    modeloCarro: dados.modeloCarro,
    tempo: diffInMinutes,
    left: "false",
    pago: dados.pago,
    valorPago: valorFormatado
  });

  // Remover o registro do check-in do banco de dados
  await Checkin.destroy({ where: { 'id': idbutton } });

  res.redirect("/estacionamento/checkout");
};

// Rota para renderizar a página do historico
exports.historico = async (req, res) => {
  const dados = await Historico.findAll({where:{'placadoCarro':req.params.placadoCarro}});
  res.render('estacionamento/historico', {posts: dados});
};

exports.pesquisa = async(req, res) => {
  const dados = await Placa.findAll({});
  res.render('estacionamento/historicoPlaca', {posts: dados});
};