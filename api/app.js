//incluindo express
const express = require('express');

//incluindo o cors para acesso a API
const cors = require('cors')

//incluindo mongoose
const mongoose = require('mongoose');

//incluindo model no projeto
require('./models/Contas');
const Conta = mongoose.model('Conta')

//atribui a função express para app que vai ser utilizada para crias rotas
const app = express();

//defini que a aplicação está preparada para receber json
app.use(express.json())

//configuração para requisição externa
app.use((req,res, next) => {
  res.header("Access-Control-Alow-Origin", "*"); //Requisições vinda de sites e app
  res.header("Access-Control-Alow-Methids", "GET, POST"); // Permite cadastrar e listar
  res.header("Access-Control-Alow-Headers","X-PINGOTHER,Content-Type, Authorization");//Site pode mandar e API está preparada para receber
  app.use(cors());
  next();
});

//senha: 3tKB7J9md
//criando conexão com banco que está na Umbler
mongoose.connect('mongodb://andersonapi:k6cPcN9784@mongo_andersonapi:27017/andersonapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexão com o BD MongoDB realizada com sucesso!")
}).catch((err) => {
  console.log("ERRO: Conexão com o BD MongoDB não realizada com sucesso: " + err);
});

//rota para consultar
app.get('/contas', async (req, res) => {
//consulta dados do usuário (await para esperar o processamento)
  await Conta.find({}).then((contas) => {
    return res.json({
      error: false,
      contas
    });
  }).catch((err) => {
    return res.status(400).json({
      error: true,
      message: "nenum registro encontrado!"
    });
  });
});

//rota para cadastrar
app.post('/contas', async (req, res) => {
  //recebe dados do usuário (await para esperar o processamento)

  await Conta.create(req.body, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Erro conta não cadastrada com sucesso."
    });
  });
  return res.json({
    error: false,
    message: "Conta cadastrada com sucesso!"
  })
});

//Conexão com servidor(node) da Umbler 
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Servido iniciado na porta ' + port +': http://andersonapi1-com-br.umbler.net')
});
