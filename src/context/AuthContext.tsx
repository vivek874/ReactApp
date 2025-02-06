import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("userRole")
  );
  
  const login = (role: string) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
  };
  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


