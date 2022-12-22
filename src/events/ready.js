const { config } = require("dotenv");
const mongoose = require('mongoose');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.mongodb || '', {
            keepAlive:true,
        })
        
        if (mongoose.connect) {
            mongoose.set('strictQuery', true);
            console.log('MongoDB connection successful')
        }
        
        console.log('Ready!');

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};