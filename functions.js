        //  ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ //

let playersArr = [];
const Discord = require("discord.js");

        // МОДУЛИ //

let userTimer = require("./modules/UserTimer.js");
let timer = require("./modules/timer.js");
let data = require("./modules/data");
let emoji = require("./modules/emoji");

let createCard = data.createCard();
let accident = data.accident;

        // ФЛАЖКИ //

let playerHandler = false;

        // КОМАНДЫ //

function test(bot, msg , args)
{
    msg.channel.send('Понг!');
}

function apocalypse(bot, msg, args)
{
    joinBot(msg)
    let form = "\tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ\nНапиши '!я' чтобы зарегистрироваться!";

    let gameChat = msg.channel;
    gameChat.send(form);
    playerHandler = true; // Делаем возможность регистрации

    timer(10, msg, true);
    setTimeout( () => {
        playerHandler = false;
        console.log(`players: ${playersArr}\nplayers_count: ${playersArr.length}`);
        playersArr.forEach( player => player.send(createCard()));

        gameChat.send("\nРегистрация завершена :clipboard:. Я вам в личные сообщения отправил карточки :credit_card:. " +
            "На ознакомление с ними я даю вам одну минуту. :alarm_clock:" +
            "\n\nСписок тех, кто играет:\n");

        playersArr.forEach( player => {
            gameChat.send("-\t" + player.username + " " + emoji());
        });
        gameChat.send("\n- - - - - - - - - - - - - - - - - -\n");

        timer(60, msg, true);
        setTimeout(() => {
            gameChat.send("Начинается первый ход!");
            gameChat.send();
            // вызов функции первого хода
            // В функции должны передаваться массив игроков, игровой чат
            // Так же нужен функционал мута игроков по айди (Добавить в функцию mute аргумент player_id)
            //
        }, 60000);
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
            msg.reply(answer[Math.floor(Math.random() * answer.length)] + " Всего игроков: " + playersArr.length + ".");
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