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
    try {
        joinBot(msg)
    } catch (e) {
        msg.channel.send("Войди в голосовой чат для запуска игры.");
        return;
    }
    let gameChat = msg.channel;
    gameChat.send(hello());
    playerHandler = true; // Делаем возможность регистрации

    timer(10, msg, true);
    setTimeout( () => {
        playerHandler = false;
        if(playersArr.length != 0) {
            playersArr.forEach( player => player.send(data.createCard(player.username)));

            gameChat.send("**Регистрация завершена** :clipboard:. Я вам в *личные сообщения* отправил карточки :credit_card:. " +
                "На ознакомление с ними я даю вам **одну минуту**. :alarm_clock:" +
                "\n\n*Список тех, кто играет:*\n");

            playersArr.forEach( player => {
                gameChat.send("-\t" + player.username + " " + emoji());
            });
            gameChat.send("\n- - - - - - - - - - - - - - - - -\n");

            timer(60, msg, true);
            setTimeout(() => {
                gameChat.send("Начинается первый ход!" +
                    "\nУзнайте про катастрофу!\n");
                // вызов функции первого хода
                // В функции должны передаваться массив игроков, игровой чат
                // Так же нужен функционал мута игроков по айди (Добавить в функцию mute аргумент player_id)
                firstStep(gameChat, msg);
            }, 60000);
        }
        else {
            gameChat.send("Никто не захотел со мной играть :sob:");
            leaveСhannel(msg);
        }
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

function firstStep(gameChat, msg)
{
    gameChat.send(createEmbed(arrRandom(accident)));
    timer(60,msg,true);
    setTimeout(()=>{
       secondStep(gameChat, msg);
    },60000);
}

function secondStep(gameChat, msg){
    gameChat.send("Начинается второй ход :smiling_imp:");
    gameChat.send("Ща всех в мут кинем, и каждому по минуте дадим :wink:");
    playersArr.forEach( player => {
        mute(gameChat, player, true);
    });
    playersArr.forEach( player => {
        mute(gameChat, player, false);
        gameChat.send("Очередь игрока: "+player.username);
        timer(60,msg,true);
        setTimeout(()=>{
            msg.delete();
            mute(gameChat, player, true);
        },60000);
    });
}

function joinBot(msg)
{
    msg.member.voice.channel.join();
}
function leaveСhannel(msg)
{
    msg.member.voice.channel.leave();
}

function mute(gameChat, player, choose)
{
    gameChat.guild.member(player).voice.setMute(choose);
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

function createEmbed(accident)
{
    const embed = new Discord.MessageEmbed()
        .setColor('#8b0000')
        .setTitle(accident.name)
        .setDescription(accident.description)
        .setImage(accident.image)
    return embed;
}

function getCard(bot, msg, args)
{
    msg.author.send(data.createCard(msg.author.username));
}

function ping(bot, msg, args)
{
    msg.channel.send("понг!");
}

        // СПИСОК КОММАНД //

let commandList = [

        // служебные комманды
    {name: "таймер", out: userTimer, about: "Таймер"},
    {name: "карта", out: getCard, about: "Проверка карточки"},
    {name: "пинг", out: ping, about: "проверка отзыва бота"},

        // апокалипсис
    {name: "апокалипсис", out: apocalypse, about: "Ну тупа на тест"},
    {name: "я", out: auth, about: "Авторизация"},

        //создание роли
    {name: "create", out: createRole, about: "создание новой роли"},
    {name: "remove", out: removeRole, about: "удаление роил"}

]

module.exports.list = commandList;