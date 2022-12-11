'use strict'

const orderRepository = require('../repositories/costumer-repository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const _repo = new orderRepository()
const config = require('../config');

function orderController() {}

orderController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.costumerId, 'Informe o cliente')
  _validator.isRequired(req.body.plateId, 'Informe o prato')
  _validator.isRequired(req.body.quantity, 'Informe a quantidade')
  _validator.isRequired(req.body.total, 'Informe o total')
  _validator.isRequired(req.body.status, 'Informe o status')

  ctrlBase.post(_repo, _validator, req, res)
}

orderController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.costumerId, 'Informe o cliente')
  _validator.isRequired(req.body.plateId, 'Informe o prato')
  _validator.isRequired(req.body.quantity, 'Informe a quantidade')
  _validator.isRequired(req.body.total, 'Informe o total')
  _validator.isRequired(req.body.status, 'Informe o status')

  ctrlBase.put(_repo, _validator, req, res)
}

orderController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

orderController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

orderController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

orderController.prototype.authenticate = async (req, res) => {
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

module.exports = orderController
