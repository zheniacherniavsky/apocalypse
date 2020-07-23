const Discord = require("discord.js");
const bot = new Discord.Client();

let cmd = require("./functions.js"); // команды | функции
let config = require("./configuration.json"); // все служебные константы

let token = config.token;
let prefix = config.prefix;

bot.on('ready', () => {
    console.log(`Bot was started in MASTER brunch`);
});

// * MESSAGE HANDLER *
// ЧИТАЕТ СООБЩЕНИЯ, ВЫТЯГИВАЕТ НУЖНОЕ ПРИ ПРОВЕРКИ ЕГО ИЗ СПИСКА КОММАНД
// ПЕРЕДАЕТ САМО СООБЩЕНИЕ И ЕЩЁ АРГУМЕНТЫ
// ЕСТЬ ПРОВЕРКА НА СООБЩЕНИЯ БОТА, ТАК ЧТО СВОИ НЕ ЧИТАЕТ

bot.on('message', (msg) => {
    if(msg.author.username !== bot.user.username && msg.author.discriminator !== bot.user.discriminator) // проверка на бота (долбоёба)
    {
        let command = msg.content.trim() + " "; // убираю пробелы по бокам
        let commandName = command.slice(0, command.indexOf(" ")); // вытягиваю первое слово из комманды
        let commandArgs = command.split(" "); // делаю массив аргументов ( комманда - нулевой аргумент )
        for(let pos in cmd.list) // перебираю массив комманд
        {
            let commandForm = prefix + cmd.list[pos].name; // делаю форму команды с префиксом

            if(commandForm === commandName){ // проверка на соответствие комманд
                cmd.list[pos].out(bot, msg, commandArgs); // вызов функции, которая принадлежит этой комманде
                break; // завершение цикла
            }
        }
    }
});

bot.on("message", (msg) => {
    if (msg.content === "mute") {
      let chennel = msg.member.voice.channel;
      chennel.join();
      
      // let voice = msg.member.voice;
      // voice.kick("adawd");
      let userClient = msg.guild.member(playersArr[0]);
      let voice = userClient.voice;
      // voice.setMute(true);
      console.log(client.optionsw);
      
  
    } else if (msg.content === "kick") {
      let chennel = msg.member.voice.channel;
      chennel.leave();
    }
  });
bot.login(token);
