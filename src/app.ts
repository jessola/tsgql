import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { HelloResolver, PersonResolver } from './resolvers';
import { Person } from './entities';

(async () => {
  const app = express();
  const { PORT = 8000, DATABASE_URL } = process.env;

  /* Connect to Postgres */
  await createConnection({
    type: 'postgres',
    url: DATABASE_URL,
    synchronize: true,
    entities: [Person],
  });

  /* REST Entrypoint */
  app.get('/', (req, res) => {
    res.send(`<a href="${req.baseUrl}/graphql">Go to GraphQL Playground</a>`);
  });

  /* Scaffold GraphQL Endpoint */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PersonResolver],
    }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})();
