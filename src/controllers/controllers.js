const referenceToTheDatabase = require('../services/сonsumers.service');



async function  postPersonalAccount (conversation, ctx, next) {
      await ctx.reply('Введіть ваш особовий рахунок');
      const { message } = await conversation.wait();
      const personalAccount = message.text;
    if (!Number.isNaN(personalAccount) && personalAccount.length > 8 && personalAccount.length < 11 ) {
          await ctx.reply(` Ваш особовий рахунок ${personalAccount}`);
          const sentDate = (Date(ctx.msg.date));
          console.log(sentDate)
          console.log(personalAccount);
          console.log(referenceToTheDatabase.findPersonalAccount(personalAccount))

      } else {
        await ctx.reply('Ви ввели невірний особовий рахунок');
        return next
    }
    await ctx.reply('Введіть ваш показник');
    const number = await conversation.wait();
    const counterReading = number.update.message.text;
    if (!Number.isNaN(counterReading) && counterReading.length > 0 && counterReading.length < 7) {
        await ctx.reply(`Ваш показник ${counterReading}`);

    } else {
        await ctx.reply('Ваш показник ввденеий не вірно');
        return next
    }

      console.log(counterReading);
}

module.exports = {
    postPersonalAccount
}
