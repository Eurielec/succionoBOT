const { Telegraf } = require('telegraf');
const bot = new Telegraf('INSERT TOKEN HERE');
const fs = require('fs');


function formatLeaderboard(leaderboard, text=`TOP SUCCIONADORES:\n`) {
  let body = '';
  for (object of leaderboard) {
    const [succionador, numSucciones] = [object.user, object.nSucciones];
    body = body
      + ` ${succionador}: ${numSucciones}`
      + '\n';
  };
  return text + body;
}

function insertSuccionador(succionador, leaderboard) {
  const user = leaderboard.find((object) => object.user === succionador);

  if (user) {
    user.nSucciones += 1
  } else {
    leaderboard.push({"user": succionador, "nSucciones": 1});
  }

  const jsonData = JSON.stringify(leaderboard);
  fs.writeFileSync("leaderboard.json", jsonData);

}


bot.command('getSuccion', (ctx) => {
    const succionador = ctx.message.from.username;
    const words = ctx.message.text.split(' ');
    const nextWordIndex = words.indexOf('/getSuccion') + 1;
    const leaderboard = JSON.parse(
      fs.readFileSync('./leaderboard.json')
      );

    if (nextWordIndex >= words.length) {
      return ctx.reply("No me has dixo a kien se la sukcionamos wapo ;)");
    }
    insertSuccionador(succionador, leaderboard);
    const succionado = words[nextWordIndex];
    ctx.reply(`${succionador} se la a sukcionado bastamente a ${succionado}`);
  });


  bot.command('getLeaderboard', (ctx, next) => {
    const leaderboard = JSON.parse(fs.readFileSync('./leaderboard.json'));
    // si el leaderboard esta vacío, devolver empty leaderboard. En caso contario, formatear código
    text = leaderboard.length > 0 ? 
      formatLeaderboard(leaderboard)
      : 'Empty Leaderboard';
    console.log(ctx);
    ctx.reply(text);
  })
  
  bot.launch();
