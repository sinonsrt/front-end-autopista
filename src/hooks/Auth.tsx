import React, { createContext, useCallback, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  city: any;
  company: any;
  access_level: number;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  updateUser: Function;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@autopista:token");
    const user = localStorage.getItem("@autopista:user");
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("login", {
      email,
      password,
    });

    const { token } = response.data.token;
    const { user } = response.data;

    localStorage.setItem("@autopista:token", token);
    localStorage.setItem("@autopista:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@autopista:token");
    localStorage.removeItem("@autopista:user");
    history.push("/");
    setData({} as AuthState);
  }, [history]);

  const updateUser = useCallback(
    (userData) => {
      setData({ token: data.token, user: { ...data.user, ...userData } });
      localStorage.setItem(
        "@autopista:user",
        JSON.stringify({ ...data.user, ...userData })
      );
    },
    [data]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
