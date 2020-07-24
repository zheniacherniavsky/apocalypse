        //  ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ //

let playersArr = [];
const Discord = require("discord.js");

        // МОДУЛИ //

let userTimer = require("./modules/UserTimer.js");
let timer = require("./modules/timer.js");
let data = require("./modules/data");
let emoji = require("./modules/emoji");

let accident = data.accident; // массив трагедий

        // ФЛАЖКИ //

let playerHandler = false;

        // КОМАНДЫ //

function apocalypse(bot, msg, args)
{
    joinBot(msg)

    let gameChat = msg.channel;
    gameChat.send(hello());
    playerHandler = true; // Делаем возможность регистрации

    timer(10, msg, true);
    setTimeout( () => {
        playerHandler = false;
        if(playersArr.length != 0) {
            playersArr.forEach( player => player.send(data.createCard()));

            gameChat.send("\nРегистрация завершена :clipboard:. Я вам в личные сообщения отправил карточки :credit_card:. " +
                "На ознакомление с ними я даю вам одну минуту. :alarm_clock:" +
                "\n\nСписок тех, кто играет:\n");

            playersArr.forEach( player => {
                gameChat.send("-\t" + player.mentions + " " + emoji());
            });
            gameChat.send("\n- - - - - - - - - - - - - - - - -\n");

            timer(60, msg, true);
            setTimeout(() => {
                gameChat.send("Начинается первый ход!" +
                    "\nУзнайте про катастрофу!\n");
                // вызов функции первого хода
                // В функции должны передаваться массив игроков, игровой чат
                // Так же нужен функционал мута игроков по айди (Добавить в функцию mute аргумент player_id)
            }, 60000);
        }
        gameChat.send("Никто не захотел со мной играть :sob:");
    }, 10000)
}

function auth(bot, msg, args)
{
    let answer = ["я тебя зарегистрировал " + emoji(),
        "новый игрок " + emoji(),
        "проиграет первым ahaha " + emoji(),
        "ну тупа залетел в игру " + emoji(),
        "не берите его в бункер ПЖ " + emoji(),
        "добрый вечер " + emoji()
    ];

    if (playerHandler) {
        if(!playersArr.includes(msg.author)) {
            playersArr.push(msg.author);
            msg.reply(arrRandom(answer) + "\nВсего игроков: " + playersArr.length + ".");
        }
    }
}

function firstStep(gameChat){

}

function joinBot(msg){
    msg.member.voice.channel.join();
}

function mute(bot, msg, args)
{
    let userClient = msg.guild.member(playersArr[0]);
    let voice = userClient.voice;
    voice.setMute(true);
}

function kick(bot, msg, args)
{
    msg.member.voice.channel.leave();
}

function createRole (bot, msg, args){
    msg.guild.roles.create({data: {
        name: 'Test',
        color: 'BLUE',
      }});
}

function removeRole (bot, msg, args){
   
}

function arrRandom(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
}

function hello() {
    const embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTitle('АПОКАЛИПСИС :boom::boom::boom:')
        .setDescription('Пиши **!я** чтобы зарегистрироваться!')
    return embed;
}
        // СПИСОК КОММАНД //

let commandList = [

        // служебные комманды
    {name: "таймер", out: userTimer, about: "Таймер"},

        // апокалипсис
    {name: "апокалипсис", out: apocalypse, about: "Ну тупа на тест"},
    {name: "я", out: auth, about: "Авторизация"},

        // бот
    {name: "mute", out: mute, about: "мут на игрока"},
    {name: "kick", out: kick, about: "отключение от канала"},

        //создание роли
    {name: "create", out: createRole, about: "создание новой роли"},
    {name: "remove", out: removeRole, about: "удаление роил"}

]

module.exports.list = commandList;

//
// let playersCount = null;
// let playerHandler = false;
// let playersArr = [];
// let form = "\tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ\nНапиши 'я' чтобы зарегистрироваться! Нажми на :grey_question: чтобы узнать правила.";
//
// bot.on('message', msg => {
//     if (msg.content === '!ИГРА')
//     {
//
//
//
//         timer(5, msg);
//         setTimeout( () => {
//             playerHandler = false;
//             console.log(`players: ${playersArr}\nplayers_count: ${playersArr.length}`);
//             playersArr.forEach( player => player.send("Ты зарегистрировался, теперь я буду слать тебе личные сообщения :cowboy:"));
//         }, 5000);
//     }
// });
//
// bot.on("message", msg => {
//     if (msg.content === "я" && playerHandler) {
//         if(!playersArr.includes(msg.author)) {
//             playersCount++;
//             playersArr.push(msg.author);
//         }
//     }
// });