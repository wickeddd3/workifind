"use client";

import { getUser } from "@/actions/user";
import { User } from "@prisma/client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleFetchUser = async () => {
    const user = await getUser();

    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    if (!user) {
      handleFetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
