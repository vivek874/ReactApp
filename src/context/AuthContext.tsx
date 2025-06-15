import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
interface AuthContextType {
  userRole: string | null;
  userName: string | null;
  login: (role: string, name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const navigate = useNavigate(); 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("userRole") // Load stored user role on startup
  );
  const [userName, setUserName] = useState<string | null>(
    localStorage.getItem("userName") // Load stored user name on startup
  );

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [userRole]); // Sync localStorage whenever userRole changes

  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    } else {
      localStorage.removeItem("userName");
    }
  }, [userName]); // Sync localStorage whenever userName changes

  const login = (role: string, name: string) => {
    setUserRole(role);
    setUserName(name);
  };

  const logout = () => {
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem("userRole"); // Clear on logout
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ userRole, userName, login, logout }}>
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