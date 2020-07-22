const Discord = require("discord.js");
const client = new Discord.Client();
const timer = require('./modules/timer.js');

client.on('ready', () => {
    console.log(`Bot was started`);
});

let form = " \tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ " +
    "\nНачните игру, нажми на реакцию!" +
    "\t\t\nУ тебя 15 секунд!";

let playersCount = null;

client.on('message', msg => {
    if (msg.content === '!ИГРА')
    {
        let gameChat = msg.channel;
        gameChat.send(form);

        // Create a reaction collector
        const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === msg.author.id;
        msg.react("👌");
        const collector = msg.createReactionCollector(filter, { time: 15000 });
        collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
        collector.on('end', collected => {
            gameChat.send(`Зарегистрированно ${collected.size} игроков.`);
            playersCount = collected.size;
        });
    }
});

client.on("message", (msg) => {
    if (msg.content === "опа") {
        timer(15, msg);
    }
});

client.login("NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8");
