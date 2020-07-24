        //  ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ //

let playersArr = [];
const Discord = require("discord.js");
let emoji = [
    ":eyes:",
    ":watermelon:",
    ":cowboy:",
    ":innocent:",
    ":partying_face:",
    ":heart_eyes:",
    ":brain:",
    ":alien:",
    ":space_invader:"
];

        // МОДУЛИ //

let userTimer = require("./modules/UserTimer.js");
let timer = require("./modules/timer.js");
let createCard = require("./modules/data");

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
    let form = "\tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ\nНапиши '!я' чтобы зарегистрироваться!";

    let gameChat = msg.channel;
    gameChat.send(form);
    playerHandler = true; // Делаем возможность регистрации

    timer(10, msg);
    setTimeout( () => {
        playerHandler = false;
        console.log(`players: ${playersArr}\nplayers_count: ${playersArr.length}`);
        playersArr.forEach( player => player.send(createCard()));

        gameChat.send("Регистрация завершена :clipboard:. Я вам в личные сообщения отправил карточки :credit_card:. " +
            "На ознакомление с ними я даю вам одну минуту. :alarm_clock:" +
            "\nСписок тех, кто играет:\n");
        playersArr.forEach( player => {
            gameChat.send(player.name + " " + getRandomFromArr(emoji));
        });
        timer(60, msg, true);
        setTimeout(() => {
            gameChat.send("Начинается первый ход!");
            // вызов функции первого хода
            // В функции должны передаваться массив игроков, игровой чат
            // Так же нужен функционал мута игроков по айди (Добавить в функцию mute аргумент player_id)
            //
        }, 60000);

    }, 10000)
}

function auth(bot, msg, args)
{
    let answer = ["я тебя зарегистрировал :dizzy:",
        "новый игрок :hatching_chick:",
        "проиграет первым ahaha :poop:",
        "ну тупа залетел в игру :merman:",
        "не берите его в бункер ПЖ :panda_face:",
        "добрый вечер :sparkling_heart:"
    ];

    if (playerHandler) {
        if(!playersArr.includes(msg.author)) {
            playersArr.push(msg.author);
            msg.reply(answer[Math.floor(Math.random() * answer.length)] + " Всего игроков: " + playersArr.length + ".");
        }
    }
}

function mute(bot, msg, args)
{
    msg.member.voice.channel.join();
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

function getRandomFromArr(arr)
{
    return arr[Math.floor(Math.random()*arr.length)];
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