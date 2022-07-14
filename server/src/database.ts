export type User = {
  id: string;
  username: string;
  password: string;
};
export const users: User[] = [
  { id: "0", username: "user1", password: "password" },
  { id: "1", username: "user2", password: "password" },
];

export const logins: { [key: string]: string } = {
  "user1@example.com": "abc123",
};

export interface Database {
  users: User[];
  logins: { [key: string]: string };
}
export const database = {
  users,
  logins,
};

export const getUserByUsername = (username: string): User | undefined => {
  for (let row in users) {
    const user = users[row];
    if (user.username == username) {
      return user;
    }
  }
};

export const getUserFromAuthHeader = async ({
  authorizationHeader,
}: {
  authorizationHeader: string;
}): Promise<User | null | undefined> => {
  const authParts = authorizationHeader.split(" ");
  // TODO: throw errors instead of simply returning null
  if (authParts.length != 2) {
    return null;
  }
  const authType = authParts[0];
  const authToken = authParts[1];
  if (authType !== "Bearer") {
    return null;
  }
  // TODO: optimize into lookup tables
  for (let username in logins) {
    const loggedInAuthToken = logins[username];
    if (loggedInAuthToken === authToken) {
      return getUserByUsername(username);
    }
  }
  return null;
};
