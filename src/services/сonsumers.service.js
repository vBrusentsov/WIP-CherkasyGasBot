
class ConsumersService {
    constructor(connectionDatabase) {
        this.connectToDatabase = connectionDatabase
    }
    async findAccount(personalAccount) {
       const [result] = await this.connectToDatabase.connection.query('SELECT * FROM consumers WHERE personal_account = ?', [personalAccount] )
        return result
    }
}

module.exports =  {
    ConsumersService
}
