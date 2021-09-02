import { api } from "@/services/api";
import Router from 'next/router';

import { createContext, ReactNode, useState } from "react";



type User = {
  email: string;
  permissions: string[];
  roles: string[];
}



type SingInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  singIn(credentials: SingInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
 
  const isAuthenticated = false;

  async function singIn({ email, password }: SingInCredentials) {
    try {
      const response = await api.post("session", {
        email,
        password,
      });

      const {permissions, roles} = response.data;


      setUser({
        email,
        permissions,
        roles,
      })

      Router.push('/dashboard');
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <AuthContext.Provider value={{ singIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
