class Worker {
    //implementando o construtor da classe
    constructor(id, name, userName, email, password, birthDate, address, city, state) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.address = address;
        this.city = city;
        this.state = state;
    }
}

module.exports = Worker;