import { queryField, objectType } from "nexus";
import { Context } from "../../context";
import { database } from "../../database";

export const LoggedInUsersResult = objectType({
  name: "LoggedInUsersResult",
  definition(t) {
    t.nonNull.list.string("usernames");
  },
});

// return string type
export const loggedInUsers = queryField((t) => {
  t.field("loggedInUsers", {
    type: LoggedInUsersResult,
    args: null,
    async resolve(root, args, context: Context) {
      if (!context.user) {
        throw new Error("Unauthorized");
      }
      console.log({ logins: database.logins });
      const loggedInUsernames: string[] = [];
      for (let username in database.logins) {
        console.log({ username });
        loggedInUsernames.push(username);
      }
      console.log({ loggedInUsernames });
      return { usernames: loggedInUsernames };
    },
  });
});
