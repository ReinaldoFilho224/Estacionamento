const User = require('../db/User');
const bcrypt = require("bcrypt");


//Página de Login
exports.page = (req , res) => {
    res.render("login/login", { error: 'Usuário ou senha incorretos' });
};

//Página de Criação de User
exports.createUser = (req , res) =>{
    res.render("login/createUser");
};

//Registrar novo usuário
exports.registerUser = (req, res) =>{
    var login = req.body.user;
    var pass = req.body.pass;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);

    User.findOne({
        where:{
            email: login //verificando se o usuário está cadastrado
        }}).then(user => {
            if(user == undefined){
                User.create({
                    email: login,
                    password: hash
                    }).then(() =>{
                        res.redirect("/login/");
                    });

            }else{
                res.redirect("/user/create/");
            };
        });
};

//Autenticação Login
exports.auth = (req, res) => {
    const login = req.body.user;
    const pass = req.body.pass;
  
    User.findOne({
      where: {
        email: login
      }
    }).then(user => {
      if (!user) {
        res.render('login/login', { showError: true });
        return;
      }
  
      const correct = user.password;
      bcrypt.compare(pass, correct, (err, match) => {
        if (match) {
          req.session.user = {
            id: user.id,
            email: user.email
          };
          res.redirect('/');
          console.log('Login realizado com sucesso');
        } else {
          res.render('login/login', { showError: true });
          console.log('Senha incorreta');
        }
      });
    }).catch(() => {
        res.render('login/login', { showError: true });
    });
  };
//logout
exports.logout = (req , res) => {
    req.session.user = undefined;
    res.redirect("/login/");
};