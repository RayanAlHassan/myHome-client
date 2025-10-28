"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export interface VendorProfile {
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  workingHours: string;
  products: string[];
  status: "incomplete" | "complete";
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "customer" | "vendore" | "specialNeedCustomer";
  isActive: boolean;
  vendorProfile?: VendorProfile;
}

interface AuthContextType {
  loggedIn: boolean;
  loading: boolean;
  user: User | null;
  setLoggedIn: (value: boolean) => void;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<User | null>;
  requireAuth: () => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  loading: true,
  user: null,
  setLoggedIn: () => {},
  setUser: () => {},
  checkAuth: async () => null,
  requireAuth: () => false,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async (): Promise<User | null> => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      });

      if (res.status === 200 && res.data) {
        const backendUser = res.data;
        // Map backend data to frontend User type
        const mappedUser: User = {
          id: backendUser.id,
          name: backendUser.name,
          email: backendUser.email,
          phone: backendUser.phone,
          role: backendUser.role,
          isActive: backendUser.isActive,
          vendorProfile: backendUser.vendorProfile || undefined,
        };
        console.log("Mapped user:", mappedUser); // <-- log here

        setLoggedIn(true);
        setUser(mappedUser);
        return mappedUser;
      } else {
        setLoggedIn(false);
        setUser(null);
        return null;
      }
    } catch (err) {
      console.error("Auth error:", err);
      setLoggedIn(false);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const requireAuth = () => {
    if (!loggedIn) {
      router.push("/auth/signin");
      return false;
    }
    return true;
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {}, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      setLoggedIn(false);
      setUser(null);
      await checkAuth(); // confirm cookie removed
      router.replace("/auth/signin");
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, loading, user, setLoggedIn, setUser, checkAuth, requireAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
