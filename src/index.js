const { Bot, session } = require("grammy");
const dotenv = require("dotenv");
const path = require("path");
const { freeStorage } = require("@grammyjs/storage-free");

dotenv.config({ path: path.resolve(__dirname, "../.env") });
// const { Menu } = require('@grammyjs/menu');
const {
  conversations,
  createConversation,
} = require("@grammyjs/conversations");
const {
  consumersConversation,
} = require("./conversation/consumers.conversation");
const { DatabaseService } = require("./services/database.service");
const { ConsumersService } = require("./services/сonsumers.service");
const { RecordsService } = require("./services/records.service");

(async () => {
  const bot = new Bot(process.env.BOT_TOKEN);
  const consumersDatabaseService = new DatabaseService({
    host: process.env.Consumers_HOST,
    user: process.env.Consumers_USER,
    password: process.env.Consumers_PASSWORD,
    database: process.env.Consumers_DATABASE,
  });
  const recordsDatabaseService = new DatabaseService({
    host: process.env.Records_HOST,
    user: process.env.Records_USER,
    password: process.env.Records_PASSWORD,
    database: process.env.Records_DATABASE,
  });

  await consumersDatabaseService.init();
  await recordsDatabaseService.init();
  const consumersService = new ConsumersService(consumersDatabaseService);
  const recordsService = new RecordsService(recordsDatabaseService);
  function initial() {
    return { personalAccountID: 0 };
  }
  bot.use(session({ initial, storage: freeStorage(bot.token) }));
  bot.use(conversations());
  bot.use(
    createConversation(
      consumersConversation(consumersService, recordsService),
      "consumersConversationID"
    )
  );

  bot.command("start", async (ctx) => {
    await ctx.reply(` Добрий день ${ctx.msg.chat.first_name} ${ctx.msg.chat.last_name}.
    Вас вітає телеграм бот АТ "Черкасигаз".
    Для передачі показників лічильника введіть команду \n /postPersonalAccount`);
  });
  bot.command("postPersonalAccount", async (ctx) => {
    await ctx.conversation.enter("consumersConversationID");
  });

  bot.start();
})();
