import { MongoClient, Db } from 'mongodb';

export let database: Db;

export const startDatabaseConnection = async () => {
    const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i3edx.mongodb.net/test?retryWrites=true&w=majority`;
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    return await new Promise(resolve =>
        client.connect(err => {
            if (err) {
                console.log('[DATA BASE]', 'ERROR', err.errmsg);
            }

            database = client.db('test');
            console.log('[DATA BASE]', 'Connected', '🚀');
            resolve(true);
        })
    )
}