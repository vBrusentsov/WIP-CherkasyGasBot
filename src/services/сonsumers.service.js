class ConsumersService {
  constructor(connectionDatabase) {
    this.connectToDatabase = connectionDatabase;
  }

  async findAccount(personalAccount) {
    const [rows] = await this.connectToDatabase.connection.query('SELECT * FROM consumers WHERE personal_account = ?', [personalAccount]);
    return rows;
  }
}

module.exports = {
  ConsumersService,
};
