const mysql2 = require("mysql2/promise");

class DatabaseService {
  constructor(config) {
    this.config = config;
  }

  async init() {
    this.connection = await mysql2.createConnection(this.config);
  }
}

module.exports = {
  DatabaseService,
};
