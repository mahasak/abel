import { onRequest } from "firebase-functions/v2/https"
import * as logger from "firebase-functions/logger"
import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions'
import { Client, GatewayIntentBits } from "discord.js"
admin.initializeApp()
export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true })
    response.send("Hello from Firebase!")
});

let client: any = null


const DISCORD_CLIENT_PUBLIC_KEY = functions.config().abel.discord.client_public_key;
const DISCORD_BOT_TOKEN = functions.config().abel.discord.token;

export const interactions = onRequest(async (req, res) => {
    // Initialize discord client for messageCreate
    if (!client) {
        console.log("initialize client")
        initializeDiscordClient(req)
    }

    const signature = req.get('X-Signature-Ed25519') ?? ''
    const timestamp = req.get('X-Signature-Timestamp') ?? ''
    const isValidRequest = verifyKey(req.rawBody, signature, timestamp, DISCORD_CLIENT_PUBLIC_KEY)

    if (!isValidRequest) {
        res.status(401).end('Bad request signature')
        console.log('Bad options')
        return
    }    

    const interaction = req.body;

    if (interaction && interaction.type === InteractionType.MESSAGE_COMPONENT) {
        console.log("tesT")
        res.send({
            type: InteractionResponseType.PONG,
        });
    }

    if (interaction && interaction.type === InteractionType.APPLICATION_COMMAND) {
        console.log("test")
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `You used: ${interaction.data.name}`,
            },
        });
    } else {
        console.log("yo")
        res.send({
            type: InteractionResponseType.PONG,
        });
    }
})

function initializeDiscordClient(req: functions.https.Request) {
    client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds] });

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.on('messageCreate', async (message: any) => {
        // Ignore bots
        if (message.author.bot) return;

        let command = message.content.split(' ')[0];
        // let params = message.content.split(' ').slice(1);
        
        // Our first command
        switch (command) {
            case '!hello':
                message.channel.send('world!');
                break;
        }
        // you can add more commands in switch cases.
    });

    client.login(DISCORD_BOT_TOKEN);
}