const Discord = require('discord.js');
const client = new Discord.Client();

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
        gameChat = msg.channel;
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

client.login('TOKEN TVOY');
