const dotenv = require('dotenv');
const { Bot, session } = require('grammy');
dotenv.config();
// const { Menu } = require('@grammyjs/menu');
const {
    postPersonalAccount,
} = require('./controllers/controllers')

const {
    conversations,
    createConversation,
} = require("@grammyjs/conversations");

const bot = new Bot(process.env.BOT_TOKEN);
const { СonnectionDatabaseService } = require('./services/database.service');
const  ConsumersService = require('./services/сonsumers.service');

(async () => {
    const connectToDatabase = new СonnectionDatabaseService();
    await connectToDatabase.init();

    bot.use(session({ initial: () => ({}) }))
    bot.use(conversations());

    bot.use(createConversation(postPersonalAccount));


    bot.command('start', async  (ctx) => {
        await ctx.reply(`Добрий день ${ctx.msg.chat.first_name} ${ctx.msg.chat.last_name}.
Вас вітає телеграм бот АТ "Черкасигаз".
Для передачі показників лічильника введіть команду \/postPersonalAccount`)

    })

// bot.command('getinfo', (ctx) => {
//     connection.query('SELECT * FROM consumers', (err, result, fields)=> {
//         if(!err) {
//             ctx.reply(result[0])
//         } else {
//             console.log(err);
//         }
//     })
// })
//
    bot.command('postPersonalAccount', async (ctx) => {
        await ctx.conversation.enter('postPersonalAccount')
    })

// bot.command('postCounterIndicator', async (ctx) => {
//     await ctx.conversation.enter('postCounterIndicator')
// })


    bot.start();
})()
