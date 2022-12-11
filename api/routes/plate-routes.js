'use strict'

//realizando as importacoes
const express = require('express');
const controller = require('../controllers/workerController');
const router = express.Router();
const auth = require('../middlewares/authentication');

//instanciando o objeto da classe trainerController
let _ctrl = new controller()

//definindo as rotas
router.post('/login', _ctrl.authenticate);
router.get('/',  _ctrl.get);
router.get('/:id', _ctrl.getById);
router.post('/',auth, _ctrl.post);
router.put('/:id',auth, _ctrl.put);
router.delete('/:id',auth, _ctrl.delete);

//exportando o modulo
module.exports = router;