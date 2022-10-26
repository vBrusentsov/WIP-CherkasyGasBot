class RecordsService {
  constructor(connectionDatabase) {
    this.recordsDatebase = connectionDatabase.connection;
  }

  async findAccount(personalAccount) {
    const [result] = await this.recordsDatebase.query(
      "SELECT * FROM records WHERE personal_account = ? ",
      [personalAccount]
    );
    return result;
  }

  async insertIntoRecords(personalAccount, counterReading, sentData) {
    await this.recordsDatebase.query(
      "INSERT INTO records(personal_account = ?, counter_readings = ?,  date_of_entry = ?)",
      [personalAccount, counterReading, sentData]
    );
  }

  async updateRecords(personalAccount, counterReading, sentData) {
    await this.recordsDatebase.query(
      "UPDATE records SET counter_readings = ?,  date_of_entry = ? WHERE (personal_account = ?)",
      [personalAccount, counterReading, sentData]
    );
  }
}

module.exports = {
  RecordsService,
};
