import React, { createContext, useContext, ReactNode, useState } from "react";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  isLogging: boolean;
};
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert("Login", "Informe o E-mail e a Senha. ");
    }
    setIsLogging(true); // seta o estado para true

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        console.log(account);
      })
      .catch((error) => {
        const { code } = error; // pega o código do erro
        if (code === "auth/user-not-found" || code === "auth/wrong-password") {
          return Alert.alert("Login", "E-mail ou usuário não encontrado!");
        } else {
          return Alert.alert("Login", "Erro ao fazer login!");
        }
      })
      .finally(() => setIsLogging(false));
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isLogging,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
