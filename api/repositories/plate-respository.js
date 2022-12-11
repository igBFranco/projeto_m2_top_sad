const repBase = require('../bin/base/repository-base');

class plateRepository {
    constructor() {
        this._repBase = new repBase('plate', 'plates');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
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

module.exports = plateRepository;