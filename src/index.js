const { Bot, session, Keyboard } = require("grammy");
const dotenv = require("dotenv");
const path = require("path");
const { router } = require("./routers/router");

dotenv.config(/*{path: '../.env'}*/);

// const { Menu } = require('@grammyjs/menu');
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const { PsqlAdapter } = require("@grammyjs/storage-psql");
const { Client } = require("pg");
const {
  consumersConversation,
} = require("./conversation/consumers.conversation");
const { DatabaseService } = require("./services/database.service");
const { ConsumersService } = require("./services/сonsumers.service");
const { RecordsService } = require("./services/records.service");

(async () => {
  const bot = new Bot(process.env.BOT_TOKEN);
  const consumersDatabaseService = new DatabaseService({
    host: process.env.CONSUMERS_HOST,
    user: process.env.CONSUMERS_USER,
    password: process.env.CONSUMERS_PASSWORD,
    database: process.env.CONSUMERS_DATABASE,
  });
  const recordsDatabaseService = new DatabaseService({
    host: process.env.RECORDS_HOST,
    user: process.env.RECORDS_USER,
    password: process.env.RECORDS_PASSWORD,
    database: process.env.RECORDS_DATABASE,
  });
  const client = new Client({
    user: process.env.SESSIONS_USER,
    hostname: process.env.SESSIONS_HOST,
    database: process.env.SESSIONS_DATABASE,
    password: process.env.SESSIONS_PASSWORD,
    port: process.env.SESSIONS_PORT,
  });

  await consumersDatabaseService.init();

  await recordsDatabaseService.init();
  const consumersService = new ConsumersService(consumersDatabaseService);
  const recordsService = new RecordsService(recordsDatabaseService);

  await client.connect();

  bot.use(
    session({
      initial: () => ({
        step: "idle",
        personalAccountID: 0,
      }),
      // storage: await PsqlAdapter.create({ tableName: "sessions", client }),
    })
  );
  const keyboard = new Keyboard().text("Передати показник лічильника");
  bot.command("start", async (ctx) => {
    await ctx.reply(
      ` Добрий день ${ctx.msg.chat.first_name} ${ctx.msg.chat.last_name}.
Вас вітає телеграм бот АТ "Черкасигаз".
Для передачі показників лічильника натисніть на кнопку "Передати показник лічильника" `,
      { reply_markup: keyboard }
    );
  });
  bot.hears(/.*Передати показник лічильника*./, async (ctx) => {
    if (ctx.session.personalAccountID === 0) {
      ctx.session.step = "postPersonalAccount"
    } else {
      ctx.session.step = "counterReading"
    }
  });
  // bot.command("postPersonalAccount", async (ctx) => {
  //   await ctx.conversation.enter("consumersConversationID");
  // });
  bot.use(router);
  bot.start();
})();
