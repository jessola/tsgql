import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { HelloResolver } from './resolvers';

(async () => {
  const app = express();
  const { PORT = 8000 } = process.env;

  /* REST Entrypoint */
  app.get('/', (req, res) => {
    res.send(`<a href="${req.baseUrl}/graphql">Go to GraphQL Playground</a>`);
  });

  /* Scaffold GraphQL Endpoint */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})();
