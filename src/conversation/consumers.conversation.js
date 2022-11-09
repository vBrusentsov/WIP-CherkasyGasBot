/* eslint no-param-reassign: ["error", { "props": false }] */

const consumersConversation =
  (consumersService, recordsService) => async (conversation, ctx) => {
    try {
      if (conversation.session.personalAccountID === 0) {
        await ctx.reply("Введіть ваш особовий рахунок");
        const { message } = await conversation.wait();
        const personalAccount = message.text;
        const consumerAccount = await consumersService.findAccount(
          personalAccount
        );
        console.log(personalAccount);
        if (
          !Number.isNaN(personalAccount) &&
          personalAccount.length > 8 &&
          personalAccount.length < 11 &&
          consumerAccount[0] !== undefined
        ) {
          await ctx.reply(` Ваш особовий рахунок ${personalAccount}`);
          conversation.session.personalAccountID = personalAccount;
          console.log(conversation.session.personalAccountID);
        } else {
          await ctx.reply("Ви ввели невірний особовий рахунок");
          return;
        }
      }
      // eslint-disable-next-line no-unreachable
      const recordsAccount = await recordsService.findAccount(
        conversation.session.personalAccountID
      );
      const consumerAccount = await consumersService.findAccount(
        conversation.session.personalAccountID
      );
      await ctx.reply(
        `Введіть ваш показник. Ваш попередній показник ${consumerAccount[0].counter_readings}`
      );
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
          +conversation.session.personalAccountID,
          counterReading,
          sentDate
        );
      } else {
        await recordsService.updateRecords(
          +conversation.session.personalAccountID,
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
