'use strict'

const express = require("express");
const cors = require("cors");
const config = require('./config');
const workerRoutes = require('./routes/worker-routes');
const costumerRoutes = require('./routes/costumer-routes');
const orderRoutes = require('./routes/order-routes');
const plateRoutes = require('./routes/plate-routes');
const app = express();

//configurando o Body Parser
app.use(express.json());

//definindo a utilizacao do cors
app.use(cors());

//definindo as rotas
app.use('/api/workers', workerRoutes);
app.use('/api/costumers', costumerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/plates', plateRoutes);

//definindo a porta onde o servidor estara ouvindo
app.listen(config.port, () => {
    console.log(`API rodando em ${config.url}`);
})