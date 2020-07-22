const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.name}`);
    console.log(`${client.user.displayName}`);
});

client.on('message', msg => {
    if (msg.content === 'хуй') {
        let mem = msg.member;
        mem.send("ты хуй");
    }
});

client.login('NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8');