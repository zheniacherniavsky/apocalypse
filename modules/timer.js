const Discord = require("discord.js");
const client = new Discord.Client();

function timer(time, msg) {
    msg.channel.send(`Осталось: ${time} секунд.`).then((msg) => {
        let timeout=client.setInterval(() => {
            time -= 5;
            if(time > 5)
                msg.edit(`Осталось: ${time} секунд.`)
            else if (time == 0) {
                // Пишет что время вышло и ждёт 2 секунды
            }
            else
                msg.edit(`Осталось: ${time} секунд. Поспеши!!!`);
        }, 5000);

        setTimeout(()=> {
            clearInterval(timeout);
            msg.delete();
            },time*1000+3000);
    });
}

module.exports = timer;