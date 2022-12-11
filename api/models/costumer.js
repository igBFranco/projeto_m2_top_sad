class Costumer {
    //implementando o construtor da classe
    constructor(id, name, email, password, birthDate, address, city, state) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.address = address;
        this.city = city;
        this.state = state;
    }
}

module.exports = Costumer;