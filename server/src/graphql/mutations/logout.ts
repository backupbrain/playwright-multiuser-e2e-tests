import { mutationField, objectType } from "nexus";
import { Context } from "../../context";
import { database } from "../../database";

export const LogoutResult = objectType({
  name: "LogoutResult",
  definition(t) {
    t.nonNull.boolean("success");
  },
});

export const loginMutation = mutationField("login", {
  type: LogoutResult,
  async resolve(root, args, context: Context) {
    if (!context.user) {
      throw new Error("Unauthorized");
    }
    delete database.logins[context.user.username];
  },
});
