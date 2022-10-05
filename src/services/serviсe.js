const connection = require('../server/DataBase');

connection.connect();

class referenceToTheDatabase {

    checkPersonalAccountInTableDatabase (personalAccount) {
        try{
            connection.execute('SELECT * FROM consumers WHERE personal_account = ?', [personalAccount], (err, result, fields) => {
                if (err) {
                    return err
                } else {
                    if (result.length === 0) {
                        console.log('Вас не має у базі данних');
                    } else {
                        console.log(`Вас знайдено у базі данних`);
                        console.log(result[0])
                    }
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new referenceToTheDatabase()
