import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  userLoggedIn: boolean;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  userLoggedIn: false
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored dev user function
  const checkDevModeUser = () => {
    const storedUser = localStorage.getItem('devModeUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log("✅ AuthContext: Dev mode user loaded:", user);
        setCurrentUser(user as any);
        return true;
      } catch (e) {
        console.log("Dev mode user parsing failed");
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log("🔐 AuthContext: Setting up auth state listener (Dev Mode - No Firebase)...");
    
    let timeoutCleared = false;
    
    // Set a timeout to ensure the app loads even if Firebase is slow
    const timeout = setTimeout(() => {
      if (loading && !timeoutCleared) {
        console.warn("⚠️ Firebase auth initialization timeout, loading app anyway");
        setLoading(false);
      }
    }, 5000); // Increased to 5 seconds

    // Check for stored user in localStorage (dev mode bypass)
    if (checkDevModeUser()) {
      timeoutCleared = true;
      clearTimeout(timeout);
      setLoading(false);
      return;
    }

    // Try Firebase auth if available, otherwise just load normally
    try {
      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          timeoutCleared = true;
          clearTimeout(timeout);
          
          if (user) {
            console.log("✅ AuthContext: User logged in:", {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName
            });
          } else {
            console.log("❌ AuthContext: No user logged in");
          }
          setCurrentUser(user);
          setLoading(false);
        },
        (error) => {
          console.error("❌ Auth state change error:", error);
          timeoutCleared = true;
          clearTimeout(timeout);
          setLoading(false);
        }
      );

      // Cleanup subscription and timeout on unmount
      return () => {
        console.log("🔐 AuthContext: Cleaning up auth listener");
        timeoutCleared = true;
        clearTimeout(timeout);
        unsubscribe();
      };
    } catch (e) {
      console.log("⚠️ Firebase not available, running in offline mode");
      timeoutCleared = true;
      clearTimeout(timeout);
      setLoading(false);
    }
  }, []);

  // Listen for storage changes (when logged in from another tab or after login)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("📦 AuthContext: Storage change detected, checking for user...");
      checkDevModeUser();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('devModeUser');
    try {
      await onAuthStateChanged(auth, () => {});
    } catch (e) {
      // Firebase not available, that's okay
    }
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    userLoggedIn: !!currentUser,
    logout: handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading Bloomify...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
