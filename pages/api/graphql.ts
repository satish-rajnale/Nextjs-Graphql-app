import { ApolloServer } from "apollo-server-micro";
import "reflect-metadata";
const server = new ApolloServer({});

export const config = {
  api: { bodyParser: false },
};

const startServer = server.start();

export default async function handler(req, res) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
