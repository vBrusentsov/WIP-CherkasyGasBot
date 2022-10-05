const { Bot, Context, session } = require('grammy');
const mysql = require('mysql2');
const connection = require('./server/DataBase')
// const { Menu } = require('@grammyjs/menu');
const dotenv = require('dotenv');
const {
    postPersonalAccount,
    postCounterIndicator
} = require('./Controllers/controllers')
const {
    conversations,
    createConversation,
} = require("@grammyjs/conversations");

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);
connection.connect();

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
