const repBase = require('../bin/base/repository-base');

class costumerRepository {
    constructor() {
        this._repBase = new repBase('costumer', 'costumers');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            name: data.name,
            email: data.email,
            birthDate: data.birthDate,
            address: data.address,
            city: data.city,
            state: data.state,
        });
    }

    async getAll() {
        return await this._repBase.getAll();
    }

    async getById(id) {
       return await this._repBase.getById(id);
    }

    async delete(id) {
        return await this._repBase.delete(id);
    }
}

module.exports = costumerRepository;