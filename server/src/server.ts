import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { schema } from "./schema";
import { getUserFromAuthHeader } from "./database";
import { Context } from "./context";

export const server = new ApolloServer({
  schema,
  context: async (request) => {
    const context: Context = { user: null };
    console.log({ headers: request.req.headers });
    if (request.req.headers.authorization) {
      const user = await getUserFromAuthHeader({
        authorizationHeader: request.req.headers.authorization,
      });
      if (user) {
        context.user = user;
      }
    }
    return context;
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
