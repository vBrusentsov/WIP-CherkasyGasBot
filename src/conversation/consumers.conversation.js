const consumersConversation = (consumersService) => async (conversation, ctx) => {
  try {
    await ctx.reply('Введіть ваш особовий рахунок');
    const { message } = await conversation.wait();
    const personalAccount = message.text;
    const consumerAccount = await consumersService.findAccount(personalAccount);
    if (!Number.isNaN(personalAccount)
                 && personalAccount.length > 8
                 && personalAccount.length < 11
                 && consumerAccount[0].personal_account === undefined) {
      await ctx.reply(` Ваш особовий рахунок ${personalAccount}`);
      const sentDate = (Date(ctx.msg.date).toString());
      console.log(sentDate);
      console.log(consumerAccount[0].personal_account);
    } else {
      await ctx.reply('Ви ввели невірний особовий рахунок');
    }
    await ctx.reply('Введіть ваш показник');
    const number = await conversation.wait();
    const counterReading = number.update.message.text;
    if (!Number.isNaN(counterReading) && counterReading.length > 0 && counterReading.length < 7) {
      await ctx.reply(`Ваш показник ${counterReading}`);
    } else {
      await ctx.reply('Ваш показник ввденеий не вірно');
    }

    console.log(counterReading);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  consumersConversation,
};
