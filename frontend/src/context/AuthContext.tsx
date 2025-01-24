import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, token: string, expiresIn: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("user");
    if (token && userEmail) {
      setUser({ email: userEmail, token });
    }
  }, []);

  const login = (email: string, token: string, expiresIn: number): void => {
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("user", email);
    localStorage.setItem("tokenExpiry", expiryTime.toString());
    setUser({ email, token });
  };

  const logout = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useContextAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
