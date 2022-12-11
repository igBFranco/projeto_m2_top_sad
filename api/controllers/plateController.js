'use strict'

const plateRepository = require('../repositories/plate-respository');
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const _repo = new plateRepository()
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const config = require('../config');

function plateController() {}

plateController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.name, 'Informe o nome')
  _validator.isRequired(req.body.description, 'Informe a descrição')
  _validator.isRequired(req.body.price, 'Informe o preço')

  ctrlBase.post(_repo, _validator, req, res)
}

plateController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.name, 'Informe o nome')
  _validator.isRequired(req.body.description, 'Informe a descrição')
  _validator.isRequired(req.body.price, 'Informe o preço')

  ctrlBase.put(_repo, _validator, req, res)
}

plateController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

plateController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

plateController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

plateController.prototype.authenticate = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.email, 'Informe o seu email')
  _validator.isEmail(req.body.email, 'O email informado é inválido')
  _validator.isRequired(req.body.password, 'Informe a sua senha')

  if (!_validator.isValid()) {
    res.status(400).send({
      message: 'Não foi possível efetuar o Login!',
      validation: _validator.errors()
    })
  }

  let worker = await _repo.authenticate(req.body.email, req.body.password)
  if (worker) {
    res.status(200).send({
      worker: worker,
      token: jwt.sign(
        {
          user: worker
        },
        config.secretKey
      )
    })
  } else {
    res.status(404).send({
      message: 'Usuário e senha inválidos!'
    })
  }
}

module.exports = plateController
