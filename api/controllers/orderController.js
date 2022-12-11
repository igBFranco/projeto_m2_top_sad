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

module.exports = orderController
