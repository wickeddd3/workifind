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
  userLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const handleFetchUser = async () => {
    const user = await getUser();
    setUserLoading(true);
    if (user) {
      setUser(user);
      setUserLoading(false);
    } else {
      setUser(null);
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      handleFetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
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
