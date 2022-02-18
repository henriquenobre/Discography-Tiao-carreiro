const Sequelize = require("sequelize");
const databaseConfig = require("../config/database");

const Album = require("../models/Album");
const Faixa = require("../models/Faixa");

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);

    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error.message);
    }

    //INIT
    Album.init(this.connection);
    Faixa.init(this.connection);

    //ASSOCIATE
    //User.associate(this.connection.models);
  }
}

module.exports = new Database();
