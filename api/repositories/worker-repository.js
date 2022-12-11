const repBase = require('../bin/base/repository-base');

class workerRepository {
    constructor() {
        this._repBase = new repBase('worker', 'workers');
    }

    async create(data) {
        return await this._repBase.create(data);
    }

    async update(id, data) {
        return await this._repBase.update(id, {
            name: data.name,
            userName: data.userName,
            email: data.email,
            password: data.password,
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

module.exports = workerRepository;