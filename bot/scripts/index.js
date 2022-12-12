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

let pratosName = []

let list = []

//função para buscar os pratos da API
async function pratosAPI() {
  let res = await axios.get("http://localhost:3000/api/plates/")
  pratos = res.data
  return pratos;
  //console.log(pratos)
}

// criando o nosso teclado
const teclado_pratos = Markup.keyboard(
  pratos.forEach((prato) => { return prato.name }),
  { columns: 3 }
).resize();
const teclado_lanches = Markup.keyboard(
  ["Uramaki Salmão", "Uramaki Philadelphia", "Temaki Salmão"]
).resize();


// criando um 'Inline Keyboard' dinâmico
const itemsButtons = (list) =>
  Markup.inlineKeyboard(
    list.map((item) => Markup.button.callback(item, `remove ${item}`)),
    { columns: 3 }
  );


const CardButtons = Markup.inlineKeyboard(
  [
    Markup.button.callback("Cardápio", "card_cardapio"),
    Markup.button.callback("Pedido", "card_pratos"),
    Markup.button.callback("Cancelar", "cancelar"),
  ],
  { columns: 3 }
);

// exibindo a mensagem inicial do bot
bot.start(async (ctx) => {
  pratosAPI();
  const from = ctx.update.message.from;
  await ctx.reply(`Seja bem vindo ${from.first_name}`);
  await ctx.reply("Escolha a opção que deseja", CardButtons);
  //criando um array para armazenar os itens da sessão
  ctx.session.list = []
});

bot.action(/card_pratos/, (ctx) => {
  ctx.reply(`Pode escolher seu Prato por gentileza!`, teclado_lanches);
});
bot.action(/card_cardapio/, (ctx) => {
  ctx.reply(`Cardápio`)
  pratos.forEach((prato) => {
    ctx.replyWithPhoto({url: `${prato.image}`}, {caption: `${prato.name}, Preço: ${prato.price}`})
  }
)});
bot.action(/back/, (ctx) => {
  ctx.reply("Escolha a opção que deseja", CardButtons);
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


// removendo os itens da lista quando clicar no botão
bot.action(/remove (.+)/, ctx => {
  list = list.filter(item => item !== ctx.match[1])
  ctx.reply(`o item ${ctx.match[1]} foi removido da sua lista!`, itemsButtons(list))
})

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
