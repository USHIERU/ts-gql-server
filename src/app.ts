import Path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { startDatabaseConnection } from './database/index'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

export const startServer = async () => {
    dotenv.config();

    await startDatabaseConnection();

    const app = express();

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                Path.join(__dirname, './graphQL/**/*.{ts,js}')
            ],
        }),
        introspection: process.env.PRODUCTION ? false : true,
        playground: process.env.PRODUCTION ? false : true,
        context: ({ req, res }) => ({ req, res })
    });

    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(process.env.PORT,
        () => console.log('[Server]', 'Listening on:', `http://localhost:${process.env.PORT}/`, '🚀')
    );

    return app;
}