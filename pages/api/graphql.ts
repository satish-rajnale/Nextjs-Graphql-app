import { ApolloServer } from "apollo-server-micro";
import "reflect-metadata";
import {
  buildSchema,
  ObjectType,
  Resolver,
  Query,
  Arg,
  Field,
  ID,
} from "type-graphql";

@ObjectType()
export class Dog {
  @Field(() => ID)
  name: string;

  // @Field()
  // type: string;
}

@Resolver(Dog)
export class DogResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return [{ name: "Bo" }, { name: "Bobby" }];
  }
}

const schema = await buildSchema({
  resolvers: [DogResolver],
});

const server = new ApolloServer({ schema });

export const config = {
  api: { bodyParser: false },
};

const startServer = server.start();

export default async function handler(req, res) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
