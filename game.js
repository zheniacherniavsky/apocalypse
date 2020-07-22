const Discord = require("discord.js");
const client = new Discord.Client();
const timer = require('./modules/timer.js');
const DATA = require('./modules/data.js');

let playersCount = null;
let playerHandler = false;
let playersArr = [];
let form = "\tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ\nНапиши 'я' чтобы зарегистрироваться!";

client.on('ready', () => {
    console.log(`Bot was started`);
});

client.on('message', msg => {
    if (msg.content === '!ИГРА')
    {
        let gameChat = msg.channel;
        gameChat.send(form);
        playerHandler = false;
        timer(5, msg);

        setTimeout( () => {
            playerHandler = false;
            console.log(`players: ${playersArr}\nplayers_count: ${playersArr.length}`);
            playersArr.forEach( player => player.send("ты лох блять"));
        }, 5000);
    }
});

client.on("message", msg => {
    if (msg.content === "я" && playerHandler) {
        if(!playersArr.includes(msg.author)) {
            playersCount++;
            playersArr.push(msg.author);
        }
    }
});

// logs

client.on("message", msg => {
    console.log(msg.content);
});

client.login("NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8");
