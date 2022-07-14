import { arg, inputObjectType, mutationField, objectType } from "nexus";
import { Context } from "../../context";
import { database } from "../../database";
import { v4 as uuidv4 } from "uuid";

export const LoginResult = objectType({
  name: "LoginResult",
  definition(t) {
    t.boolean("authToken");
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.nonNull.string("username");
    t.nonNull.string("password");
  },
});

export const loginMutation = mutationField("login", {
  type: LoginResult,
  args: {
    input: arg({
      type: LoginInput,
    }),
  },
  async resolve(root, args, context: Context) {
    for (let row in database.users) {
      const user = database.users[row];
      const username = args.input.username;
      const password = args.input.password;
      if (user.username == username && user.password == password) {
        database.logins[username] = uuidv4();
      }
      return {
        authToken: database.logins[username],
      };
    }
  },
});
