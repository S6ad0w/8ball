'use strict';

const Jade = require('@botsocket/jade');

module.exports = {
    name: '8ball',
    register: (client) => {

        client.command({
            name: '8ball',
            alias: ['8ball'],
            args: ['question'],
            flags: ['channel'],
            data: {
                validation: {
                    args: Jade.object({
                        text: Jade.string().required(),
                    }),
                    failAction: 'error',
                },
                handler: async (message, { args: { question }, flags: { channel } }) => {

                    let c = message.channel;
                    function numberGen(min, max) { 
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }

                    if (channel) {

                        if (message.client.channels.cache.has(channel)) {

                            c = message.client.channels.cache.get(channel);
                        }
                        else {

                            const match = channel.match(/<#(\d{17,19})>/);
                            if (message.client.channels.cache.has(match[1])) {
                                c = message.client.channels.cache.get(match[1]);
                            }
                        }
                    }

                    try {
                        let responses = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "It is certain.", "It is decidedly so.", "Most likely.","My reply is no.",'My sources say no.','Outlook not so good.','Outlook good.','Reply hazy, try again.','Signs point to yes.','Very doubtful.','Without a doubt.','Yes.','Yes – definitely.','You may rely on it.']
                        c.send(`Magic 8ball: ${responses[numberGen(1, responses.length-1)]}`)
                    }
                    catch {}
                },
            },
        });
    },
};