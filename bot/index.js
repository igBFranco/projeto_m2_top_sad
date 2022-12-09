const env = require('./.env');
const { Telegraf } = require('telegraf');

//criando o objeto bot e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const from = ctx.update.message.from;
    ctx.reply(`Seja bem vindo, ${from.first_name}!`);
})


//iniciando o pooling com o servidor para verificar se ha novas mensagens
bot.startPolling();