const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.name}`);
    console.log(`${client.user.displayName}`);
});

client.on('message', msg => {
    if (msg.content === 'ping' || msg.content === 'пинг') {
        msg.reply('понг');
    }
});

client.on('message', msg => {
    if (msg.content === 'жека') {
        msg.reply('крутой');
    }
});

client.login('NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8');