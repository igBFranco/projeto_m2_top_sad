const repBase = require('../bin/base/repository-base');

class orderRepository {
    constructor() {
        this._repBase = new repBase('order', 'orders');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            costumerId: data.costumerId,
            plateId: data.plateId,
            quantity: data.quantity,
            total: data.total,
            status: data.status,
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

module.exports = orderRepository;