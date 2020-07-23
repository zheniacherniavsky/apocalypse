const Discord = require("discord.js");
const client = new Discord.Client();

function UserTimer(bot, msg, args) {
    let time = args[1];
    let delete_message = args[2];
    if(time) {
        msg.channel.send(`Осталось: ${time} секунд.`).then((msg) => {
            let timeout=client.setInterval(() => {
                time -= 5;
                if(time > 5)
                {
                    msg.edit(`Осталось: ${time} секунд.`);
                }
                else if (time == 0)
                {
                    msg.edit("Время вышло :(");
                    // msg.author.send("Ку-ку, твоё время вышло! Пишу на всякий случай, вдруг ты не заметишь."); // можно добавить, но it doesnt work blyat
                }
                else
                {
                    msg.edit(`Осталось: ${time} секунд. Поспеши!!!`);
                }
            }, 5000);

            setTimeout(()=> {
                clearInterval(timeout);
                if(delete_message) msg.delete();
            },time*1000+3000);
        });
    } else msg.channel.send("!таймер [время в секундах] [удалить сообщение после завершения (true/false)]");
}

module.exports = UserTimer;