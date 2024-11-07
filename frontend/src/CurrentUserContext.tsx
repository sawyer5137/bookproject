import { createContext } from "react";
import { User } from "./models";

export const CurrentUserContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({
  user: {
    userId: 0,
    username: "",
    createdAt: "",
    roleId: 0,
  },
  setUser: () => {},
});
