class ConsumersService {
  constructor(connectionDatabase) {
    this.consumersDatabase = connectionDatabase.connection;
  }

  async findAccount(personalAccount) {
    const [rows] = await this.consumersDatabase.query(
      "SELECT * FROM consumers WHERE personal_account = ?",
      [personalAccount]
    );
    return rows;
  }
}

module.exports = {
  ConsumersService,
};
