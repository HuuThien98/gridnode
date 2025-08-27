import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  subscription_plan: 'free' | 'starter' | 'pro' | 'vip1' | 'vip_b2b' | 'unlimited';
  subscription_expiry: string | null;
  scans_used: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('gridnode_token');
    if (token) {
      // Verify token and get user data
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      // In a real app, this would call your backend API
      // For demo purposes, we'll use localStorage
      const userData = localStorage.getItem('gridnode_user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('gridnode_token');
      localStorage.removeItem('gridnode_user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock login - in real app, this would call your backend
      if (email === 'admin@gridnode.info' && password === 'Thien@Nguyen9898') {
        const adminUser: User = {
          id: 'admin-1',
          email: 'admin@gridnode.info',
          role: 'admin',
          isVerified: true,
          subscription_plan: 'unlimited',
          subscription_expiry: null,
          scans_used: 0
        };
        setUser(adminUser);
        localStorage.setItem('gridnode_token', 'admin-token');
        localStorage.setItem('gridnode_user', JSON.stringify(adminUser));
      } else {
        // Mock user login
        const mockUser: User = {
          id: 'user-1',
          email: email,
          role: 'user',
          isVerified: true,
          subscription_plan: 'free',
          subscription_expiry: null,
          scans_used: 0
        };
        setUser(mockUser);
        localStorage.setItem('gridnode_token', 'user-token');
        localStorage.setItem('gridnode_user', JSON.stringify(mockUser));
      }
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      // Mock signup - in real app, this would call your backend
      const newUser: User = {
        id: 'user-' + Date.now(),
        email: email,
        role: 'user',
        isVerified: true, // Auto-verify for demo - in real app would require email verification
        subscription_plan: 'free', // Automatically assign free plan
        subscription_expiry: null,
        scans_used: 0
      };
      setUser(newUser);
      localStorage.setItem('gridnode_token', 'new-user-token');
      localStorage.setItem('gridnode_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Signup failed');
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Mock Google login
      const googleUser: User = {
        id: 'google-user-1',
        email: 'user@gmail.com',
        role: 'user',
        isVerified: true,
        subscription_plan: 'free',
        subscription_expiry: null,
        scans_used: 0
      };
      setUser(googleUser);
      localStorage.setItem('gridnode_token', 'google-token');
      localStorage.setItem('gridnode_user', JSON.stringify(googleUser));
    } catch (error) {
      throw new Error('Google login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gridnode_token');
    localStorage.removeItem('gridnode_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loginWithGoogle,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};