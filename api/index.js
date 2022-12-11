'use strict'

const express = require("express");
const cors = require("cors");
const config = require('./config');

const app = express();

//configurando o Body Parser
app.use(express.json());

//definindo a utilizacao do cors
app.use(cors());

//definindo as rotas
app.use('/api/');


//definindo a porta onde o servidor estara ouvindo
app.listen(config.port, () => {
    console.log(`API rodando em ${config.url}`);
})