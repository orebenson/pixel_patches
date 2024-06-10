export async function dropCollectionIfExists(collection, db_connection) {
    try {
        const collections = await db_connection.db.listCollections().toArray();
        const collectionExists = collections.some(name => name.name === collection);

        if (collectionExists) {
            await db_connection.db.dropCollection(collection);
            console.log(`${collection} collection found and dropped (dev only)`);
        } else {
            console.log("collection doesn't exist, creating new");
        }
    } catch (err) {
        console.error(err);
    }
}
