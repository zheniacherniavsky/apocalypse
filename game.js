const Discord = require('discord.js');
const client = new Discord.Client();
<<<<<<< Updated upstream

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.name}`);
    console.log(`${client.user.displayName}`);
});

client.on('message', msg => {
    if (msg.content === 'ping' || msg.content === 'пинг') {
        msg.reply('понг');
=======
const timer = require("./modules/timer.js");
const DATA = require("./modules/data.js");

let playersCount = null;
let playerHandler = false;
let playersArr = [];
let form =
  "\tИгра АПОКАЛИПСИС | НАЧАЛО ИГРЫ\nНапиши 'я' чтобы зарегистрироваться!";

client.on("ready", () => {
  console.log(`Bot was started`);
});

client.on("message", (msg) => {
  if (msg.content === "!ИГРА") {
    let gameChat = msg.channel;
    gameChat.send(form);
    playerHandler = true;
    timer(5, msg);

    setTimeout(() => {
      playerHandler = false;
      console.log(
        `players: ${playersArr}\nplayers_count: ${playersArr.length}`
      );
      playersArr.forEach((player) => player.send("ты лох блять"));
    }, 5000);
  }
});

client.on("message", (msg) => {
  if (msg.content === "я" && playerHandler) {
    if (!playersArr.includes(msg.author)) {
      playersCount++;
      playersArr.push(msg.author);
>>>>>>> Stashed changes
    }
  }
});

client.on("message", (msg) => {
  if (msg.content === "mute") {
    let chennel = msg.member.voice.channel;
    chennel.join();
    
    // let voice = msg.member.voice;
    // voice.kick("adawd");
    let userClient = msg.guild.member(playersArr[0]);
    let voice = userClient.voice;
    // voice.setMute(true);
    console.log(client.optionsw);
    

  } else if (msg.content === "kick") {
    let chennel = msg.member.voice.channel;
    chennel.leave();
  }
});

<<<<<<< Updated upstream
client.login('NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8');
=======
// logs

client.on("message", (msg) => {
  console.log(msg.content);
});

client.login("NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8");
>>>>>>> Stashed changes
