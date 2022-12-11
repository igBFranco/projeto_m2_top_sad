class Order {
    //implementando o construtor da classe
    constructor(id, costumerId, plateId, quantity, total, status) {
        this.id = id;
        this.costumerId = costumerId;
        this.plateId = plateId;
        this.quantity = quantity;
        this.total = total;
        this.status = status;
    }
}

module.exports = Order;