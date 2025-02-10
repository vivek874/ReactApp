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
  const [userRole, setUserRole] = useState<string | null>(null)
  
  const login = (role: string) => {
    setUserRole(role);
  
  };

  const logout = () => {
    setUserRole(null);
   
  };
  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


