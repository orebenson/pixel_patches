import mongoose from "mongoose";
import { Logger } from "../utils/log-utils";

const log = Logger.getInstance();

export async function dropCollectionIfExists(collection: string, db_connection: mongoose.Connection) {
    try {
        const collections = await db_connection.db.listCollections().toArray();
        const collectionExists = collections.some(name => name.name === collection);

        if (collectionExists) {
            await db_connection.db.dropCollection(collection);
            log.logMessage(`${collection} collection found and dropped (dev only)`);
        } else {
            log.logMessage("collection doesn't exist, creating new");
        }
    } catch (error) {
        log.logError("DB error:", error);
    }
}
