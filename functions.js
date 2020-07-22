function timer(time, msg) {
    msg.channel.send(time).then((msg) => {
      let timeout=client.setInterval(() => {
          time-=5;
        msg.edit(time);
      }, 5000);
      setTimeout(()=>{clearInterval(timeout);msg.delete();},time*1000+500);
    });
  }