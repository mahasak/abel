import { onRequest } from "firebase-functions/v2/https"
import * as logger from "firebase-functions/logger"
import * as admin from "firebase-admin"
import { discordInteractionHandler } from "./services/discord/initializeDiscordClient"

admin.initializeApp()

export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true })
    response.send("Hello from Firebase!")
});

export const interactions = onRequest(discordInteractionHandler)