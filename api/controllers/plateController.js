'use strict'

const plateRepository = require('../repositories/costumer-repository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const _repo = new plateRepository()
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

module.exports = plateController
