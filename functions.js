        //  ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ //

let playersArr = [];
const Discord = require("discord.js");

        // МОДУЛИ //

let userTimer = require("./modules/UserTimer.js");
let timer = require("./modules/timer.js");

        // ФЛАЖКИ //

let playerHandler = false;

        // КОМАНДЫ //

function test(bot, msg , args)
{
    msg.channel.send('Понг!');
}





function apocalypse(bot, msg, args)
{
    let playersCount = null;
    let form = "\tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ\nНапиши '!я' чтобы зарегистрироваться! Нажми на :grey_question: чтобы узнать правила.";

    let gameChat = msg.channel;
    gameChat.send(form);
    playerHandler = true; // Делаем возможность регистрации

    timer(10, msg);
    setTimeout( () => {
        playerHandler = false;
        console.log(`players: ${playersArr}\nplayers_count: ${playersArr.length}`);
        playersArr.forEach( player => player.send("Ты зарегистрировался, теперь я буду слать тебе личные сообщения :cowboy:"));
    }, 10000);
}

function auth(bot, msg, args)
{
    if (playerHandler) {
        if(!playersArr.includes(msg.author)) {
            playersArr.push(msg.author);
        }
    }
}



function mute(bot, msg, args)
{
    let chennel = msg.member.voice.channel;
    chennel.join();

    // let voice = msg.member.voice;
    // voice.kick("adawd");
    let userClient = msg.guild.member(playersArr[0]);
    let voice = userClient.voice;
    // voice.setMute(true);
}

function kick(bot, msg, args)
{
    let channel = msg.member.voice.channel;
    channel.leave();
}

        // СПИСОК КОММАНД //

let commandList = [

        // служебные комманды
    {name: "пинг", out: test, about: "Проверка отзыва"},
    {name: "таймер", out: userTimer, about: "Таймер"},

        // апокалипсис
    {name: "апокалипсис", out: apocalypse, about: "Ну тупа на тест"},
    {name: "я", out: auth, about: "Авторизация"},

        // бот
    {name: "mute", out: mute, about: "ВОВА НАПИШИ"},
    {name: "kick", out: kick, about: "ВОВА НАПИШИ"}

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