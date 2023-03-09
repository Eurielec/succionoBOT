const { Telegraf } = require('telegraf');
const bot = new Telegraf('6164756604:AAEuHFEdRsbr0kzR5prddBgx-hIoNIxx-74');

bot.command('getSuccion', (ctx) => {
    const succionador = ctx.message.from.username;
    const words = ctx.message.text.split(' ');
    const nextWordIndex = words.indexOf('/getSuccion') + 1;
    if (nextWordIndex >= words.length) {
      return ctx.reply("No me has dixo a kien se la sukcionamos wapo ;)");
    }
    const succionado = words[nextWordIndex];
    ctx.reply(`${succionador} se la a suk cionado bastamente a ${succionado}`);
  });
  
  bot.launch();