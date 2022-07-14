import { User } from "./database";
export interface Context {
  user: User | null;
}
