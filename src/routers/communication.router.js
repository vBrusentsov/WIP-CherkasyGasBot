const { Router: CommunicationRouter } = require("@grammyjs/router");

const router = new CommunicationRouter((ctx) => ctx.session.step);

const routersCommunication = (consumersService, recordService) => async () => {
  const postPersonalAccount = router.route("postPersonalAccount");
  postPersonalAccount.on("message:text", async (ctx) => {
    console.log(ctx.session);
    console.log(ctx.msg.text);
    const personalAccount = ctx.msg.text;
    ctx.session.personalAccountID = personalAccount;
    console.log(ctx.session.personalAccountID);
    if (
      !Number.isNaN(+personalAccount) &&
      personalAccount.length > 8 &&
      personalAccount.length < 11
    ) {
      await ctx.reply(`Ваш особовмй рахунок ${personalAccount}`);
    } else {
      await ctx.reply("Ви ввели невірний особовий рахунок");
      return;
    }

    ctx.session.step = "counterReading";
    ctx.reply("Передайте ваш показник лічильника");
  });

  const counterReading = router.route("counterReading");

  counterReading.on("message:text", async (ctx) => {
    const counterReading = ctx.msg.text;
    if (
      !Number.isNaN(+counterReading) &&
      counterReading.length > 0 &&
      counterReading.length < 7
    ) {
      await ctx.reply(`Ваш показник ${counterReading}`);
    } else {
      await ctx.reply("Ваш показник ввденеий не вірно");
      return;
      console.log(ctx.session);
      console.log(ctx.msg.text);
    }
  });
};

module.exports = { router, routersCommunication };
