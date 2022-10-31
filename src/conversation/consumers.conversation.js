const consumersConversation =
  (consumersService, recordsService) => async (conversation, ctx) => {
    try {
      await ctx.reply("Введіть ваш особовий рахунок");
      const { message } = await conversation.wait();
      const personalAccount = message.text;
      const consumerAccount = await consumersService.findAccount(
        personalAccount
      );
      const recordsAccount = await recordsService.findAccount(personalAccount);
      if (
        !Number.isNaN(personalAccount) &&
        personalAccount.length > 8 &&
        personalAccount.length < 11 &&
        consumerAccount[0] !== undefined
      ) {
        await ctx.reply(` Ваш особовий рахунок ${personalAccount}`);
        ctx.session.personalAccountID = personalAccount;
        console.log(ctx.session.personalAccountID);
      } else {
        await ctx.reply("Ви ввели невірний особовий рахунок");
        return;
      }
      await ctx.reply("Введіть ваш показник");
      const number = await conversation.wait();
      const counterReading = number.update.message.text;
      const sentDate = Date(ctx.msg.date).toString().slice(0, 24);
      if (
        !Number.isNaN(counterReading) &&
        counterReading.length > 0 &&
        counterReading.length < 7 &&
        +consumerAccount[0].counter_readings <= counterReading
      ) {
        await ctx.reply(`Ваш показник ${counterReading}`);
      } else {
        await ctx.reply("Ваш показник ввденеий не вірно");
        return;
      }
      if (recordsAccount[0] === undefined) {
        await recordsService.insertIntoRecords(
          +personalAccount,
          counterReading,
          sentDate
        );
      } else {
        await recordsService.updateRecords(
          personalAccount,
          counterReading,
          sentDate
        );
      }
      console.log(counterReading);
    } catch (err) {
      return err;
    }
  };

module.exports = {
  consumersConversation,
};
