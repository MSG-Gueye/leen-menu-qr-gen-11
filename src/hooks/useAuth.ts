import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Données de démonstration
const DEMO_USERS = [
  { id: '1', email: 'admin@kaay-scanner.sn', password: 'admin123', name: 'Administrateur' },
  { id: '2', email: 'demo@kaay-scanner.sn', password: 'demo123', name: 'Utilisateur Demo' }
];

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('kaay-scanner-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simuler un délai d'authentification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = DEMO_USERS.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name };
      setUser(userData);
      localStorage.setItem('kaay-scanner-user', JSON.stringify(userData));
      toast.success(`Bienvenue ${user.name} !`);
      setIsLoading(false);
      return true;
    } else {
      toast.error('Email ou mot de passe incorrect');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kaay-scanner-user');
    toast.success('Déconnexion réussie');
  };

  return {
    user,
    login,
    logout,
    isLoading
  };
};