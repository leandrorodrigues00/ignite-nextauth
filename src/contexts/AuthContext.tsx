import { api } from "@/services/api";
import { createContext, ReactNode } from "react";

type SingInCredentials ={
  email: string;
  password: string;
};

type AuthContextData = {
  singIn(credentials: SingInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

 export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function singIn({email, password}: SingInCredentials){
      try {
        const response = await api.post('session', {
          email,
          password,
        })
        console.log(response.data);
    
      } catch (err) {
        console.error(err);
      }
  }
  return (
    <AuthContext.Provider value={{singIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
