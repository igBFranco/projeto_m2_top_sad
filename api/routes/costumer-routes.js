'use strict'

//realizando as importacoes
const express = require('express');
const controller = require('../controllers/costumerController');
const router = express.Router();
const auth = require('../middlewares/authentication');

//instanciando o objeto da classe trainerController
let _ctrl = new controller()

//definindo as rotas
router.get('/', auth, _ctrl.get);
router.get('/:id', auth, _ctrl.getById);
router.post('/', _ctrl.post);
router.put('/:id', _ctrl.put);
router.delete('/:id', auth, _ctrl.delete);

//exportando o modulo
module.exports = router;