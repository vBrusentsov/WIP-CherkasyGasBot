class RecordsService {
  constructor(connectionDatabase) {
    this.connectionToDatebase = connectionDatabase;
  }

  async insertIntoRecords(personalAccount, counterReading, sentData) {
    await this.connectionToDatebase.connection.query(
      "INSERT INTO records(personal_account = ?, counter_readings = ?,  date_of_entry = ?)",
      [personalAccount, counterReading, sentData]
    );
  }

  async updateRecords(personalAccount, counterReading, sentData) {
    await this.connectionToDatebase.connection.query(
      "UPDATE records SET counter_readings = ?,  date_of_entry = ? WHERE (personal_account = ?)",
      [personalAccount, counterReading, sentData]
    );
  }
}

module.exports = {
  RecordsService,
};
