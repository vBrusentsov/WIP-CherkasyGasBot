

let consumersConversation = (consumersService) => {
     return async (conversation, ctx) => {

        await ctx.reply('Введіть ваш особовий рахунок');
        const { message } = await conversation.wait();
        const personalAccount = message.text;
        if (!Number.isNaN(personalAccount) && personalAccount.length > 8 && personalAccount.length < 11 ) {
            await ctx.reply(` Ваш особовий рахунок ${personalAccount}`);
            const sentDate = (Date(ctx.msg.date));
            console.log(sentDate)
            return consumersService.findAccount(personalAccount);
        } else {
            await ctx.reply('Ви ввели невірний особовий рахунок');
            return
        }
        await ctx.reply('Введіть ваш показник');
        const number = await conversation.wait();
        const counterReading = number.update.message.text;
        if (!Number.isNaN(counterReading) && counterReading.length > 0 && counterReading.length < 7) {
            await ctx.reply(`Ваш показник ${counterReading}`);

        } else {
            await ctx.reply('Ваш показник ввденеий не вірно');
            return
        }

        console.log(counterReading);
    }
}


module.exports ={
    consumersConversation
}
