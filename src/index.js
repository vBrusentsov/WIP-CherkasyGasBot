const { Bot, session } = require('grammy');
const dotenv = require('dotenv');
dotenv.config();
// const { Menu } = require('@grammyjs/menu');
const {
    consumersConversation,
} = require('./conversation/consumers.conversation')
const {
    conversations,
    createConversation,
} = require("@grammyjs/conversations");
const { DatabaseService } = require('./services/database.service');
const { ConsumersService } = require('./services/сonsumers.service');

(async () => {
    const bot = new Bot(process.env.BOT_TOKEN);
    const databaseService = new DatabaseService();
    await databaseService.init();
    const consumersService = new ConsumersService(databaseService);
    console.log(consumersService);


    bot.use(session({ initial: () => ({}) }))
    bot.use(conversations());
    bot.use(createConversation(consumersConversation(consumersService)));

    bot.command('start', async  (ctx) => {
        await ctx.reply(`Добрий день ${ctx.msg.chat.first_name} ${ctx.msg.chat.last_name}.
Вас вітає телеграм бот АТ "Черкасигаз".
Для передачі показників лічильника введіть команду \/postPersonalAccount`)

    })
    bot.command('postPersonalAccount', async (ctx) => {
        await ctx.conversation.enter('consumersConversation')
    })


    bot.start();
})()
