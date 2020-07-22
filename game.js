const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`${client.user.name}`);
  console.log(`${client.user.displayName}`);
});

function timer(time, msg) {
    msg.channel.send(time).then((msg) => {
      let timeout=client.setInterval(() => {
          time-=5;
        msg.edit(time);
      }, 5000);
      setTimeout(()=>{clearInterval(timeout);msg.delete();},time*1000+500);
    });
  }

client.on("message", (msg) => {
  if (msg.content === "опа") {
    timer(15, msg);
  }
});

client.login("NzM1NDQ0OTkxODc0MTcwOTIx.XxgXNg.l1pJipDMPMfGtwoaNK0iObIQDU8");
