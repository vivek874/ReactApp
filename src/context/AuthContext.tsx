import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
interface AuthContextType {
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const navigate = useNavigate(); 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("userRole") // Load stored user role on startup
   
   
  );

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]); // Sync localStorage whenever userRole changes

  const login = (role: string) => {
    setUserRole(role);
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole"); // Clear on logout
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
