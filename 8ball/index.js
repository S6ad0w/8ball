'use strict';

const Jade = require('@botsocket/jade');

module.exports = {
    name: '8ball',
    register: (client) => {

        client.command({
            name: '8ball',
            alias: ['8ball'],
            args: ['question'],
            flags: [''],
            data: {
                validation: {
                    args: Jade.object({
                        question: Jade.string().required(),
                    }),
                    failAction: 'error',
                },
                handler: async (message, { args: { question } }) => {

                    let c = message.channel;
                    function numberGen(min, max) { 
                        return Math.floor(Math.random() * (max - min + 1) + min);
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
