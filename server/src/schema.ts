import { makeSchema } from "nexus";
import { join } from "path";
import * as LoginMutationTypes from "./graphql/mutations/login";
import * as LogoutMutationTypes from "./graphql/mutations/logout";
import * as LoggedInUsersQueryTypes from "./graphql/queries/loggedInUsers";

export const schema = makeSchema({
  types: [LoginMutationTypes, LogoutMutationTypes, LoggedInUsersQueryTypes],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
  contextType: {
    module: join(__dirname, "context.ts"),
    export: "Context",
  },
});
