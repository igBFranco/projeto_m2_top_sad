// importando as variáveis de ambiente
const env = require("../.env");

// importando as bibliotecas 'Telegraf' e 'Markup'
const { Telegraf, Markup } = require("telegraf");

// importando a biblioteca 'Telegraf-Session'
const LocalSession = require("telegraf-session-local");

const axios = require('axios');
/**
 * criando o objeto 'bot' e o instanciando
 * como um novo objeto da classe 'Telegraf'
 */
const bot = new Telegraf(env.token);
// definindo que o bot utilizará o armazenamento em sessão
bot.use(new LocalSession({ database: "example_db.json" }).middleware());

//criando um array para salvar os pratos do cardapio
let pratos = []

async function pratosAPI() {
  await axios.get("http://localhost:3000/api/plates/").then((res) => {
    pratos = res.data;
  });
  console.log(pratos)
}

// criando o nosso teclado
const teclado_pratos = Markup.keyboard(
  pratos.map((item) => Markup.button.callback(item, item.name)),
  { columns: 3 }
).resize();
const teclado_lanches = Markup.keyboard([
  ["🥪Lanche 1", " 🥨 Lanche 2"],
]).resize();
const teclado_saladas = Markup.keyboard([
  ["🥗 Salada 1", "🥦 Salada 2", "🌯Salada 3"],
]).resize();

// criando um 'Inline Keyboard' dinâmico
const itemsButtons = (list) =>
  Markup.inlineKeyboard(
    list.map((item) => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
  );

const CardButtons = Markup.inlineKeyboard(
  [
    Markup.button.callback("Pratos", "card_pratos"),
    Markup.button.callback("Lanches", "card_lanches"),
    Markup.button.callback("Saladas", "card_saladas"),
    Markup.button.callback("Cancelar", "cancelar"),
  ],
  { columns: 3 }
);

// exibindo a mensagem inicial do bot
bot.start(async (ctx) => {
  const from = ctx.update.message.from;
  await ctx.reply(`Seja bem vindo ${from.first_name}`);
  await ctx.reply("Escolha o cardapio que deseja", CardButtons);
  pratosAPI();
  //criando um array para armazenar os itens da sessão
  ctx.session.list = []
});

bot.action(/card_pratos/, (ctx) => {
  ctx.reply(`Pode escolher seu Prato por gentileza!`, teclado_pratos);
});
bot.action(/card_lanches/, (ctx) => {
  ctx.reply(`Pode escolher seu Lanche por gentileza!`, teclado_lanches);
});
bot.action(/card_saladas/, (ctx) => {
  ctx.reply(`Pode escolher sua Salada por gentileza!`, teclado_saladas);
});
bot.action(/back/, (ctx) => {
  ctx.reply("Escolha o cardapio que deseja", CardButtons);
});
bot.action(/finish/, (ctx) => {
  ctx.reply(
    "Deseja finalizar o pedido?",
    Markup.inlineKeyboard(
      [
        Markup.button.callback("Sim", "finaliza_pedido"),
        Markup.button.callback("Não", "continua_pedido"),
      ],
      { columns: 3 }
    )
  );
  ctx.reply(`Seu pedido: ${ctx.session.list}`, itemsButtons(ctx.session.list));
});
bot.action(/finaliza_pedido/, (ctx) => {
  ctx.reply("Seu pedido foi concluido com sucesso!");
});
bot.action(/continua_pedido/, (ctx) => {
  ctx.reply("Escolha o cardapio que deseja", CardButtons);
});
bot.action(/cancelar/, (ctx) => {
  ctx.reply("Escolha de produtos cancelada!");
});

bot.on("text", (ctx) => {
  let item = ctx.update.message.text;
  // adicionando o item à lista da sessão
  ctx.session.list.push(item);                
  ctx.reply(
    `O item ${item} foi adicionado a sua comanda \n pode adicionar mais itens se quiser!`,
    Markup.inlineKeyboard(
      [
        Markup.button.callback("Voltar", "back"),
        Markup.button.callback("Finalizar", "finish"),
      ],
      { columns: 3 }
    )
  );
});

/**

 bot.hears(["🍝Pratos", "🍔Lanches", "🥗Saladas"], async (ctx) => {
   await ctx.reply(`Certo, vou te mostrar o cardapio de ${ctx.match}`);
   if (ctx.match == "🍝Pratos") {
     await ctx.reply("Pode escolher seu Prato por gentileza", teclado_pratos);
   } else if (ctx.match == "🍔Lanches") {
     await ctx.reply("Pode escolher seu Prato por gentileza", teclado_lanches);
   } else if (ctx.match == "🥗Saladas") {
     await ctx.reply("Pode escolher seu Prato por gentileza", teclado_saladas);
   }
 
   bot.on("text", async (ctx2, next) => {
     if (ctx2.message.text == "❌ Cancelar") {
       await ctx2.reply(`Escolha de produtos cancelada!`);
     } else if (ctx2.message.text == " ↩ Voltar") {
       bot.on(async (ctx) => {
         await ctx.reply(
           "Escolha o cardapio que deseja",
           Markup.keyboard(["🍝Pratos", "🍔Lanches", "🥗Saladas"])
             .resize()
             .oneTime()
         );
       });
     } else {
       await ctx2.reply(`Pedido de ${ctx2.message.text} efetuado!`);
     }
   });
 });
 */

/**
 * iniciando o 'polling' com o servidor
 * para verificar se há novas mensagens
 * e/ou conversas
 */
bot.startPolling();
