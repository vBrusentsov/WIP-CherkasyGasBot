
class ConsumersService {
    constructor(сonnectionDatabase) {
        this.connectToDatabase = сonnectionDatabase
         this.connectToDatabase.connection.query('SELECT * FROM consumers WHERE personal_account = ?', [personalAccount])
             .then(([result]) => {
                 console.log(result)
             })
             .catch(console.log)
        // connection.execute('SELECT * FROM consumers WHERE personal_account = ?', [personalAccount], (err, result, fields) => {
        //     if (err) {
        //         return err
        //     } else {
        //         if (result.length === 0) {
        //             console.log('Вас не має у базі данних');
        //         } else {
        //             console.log(`Вас знайдено у базі данних`);
        //             return result
        //         }
        //     }
        // })
    }
}

module.exports =  {
    ConsumersService
}
