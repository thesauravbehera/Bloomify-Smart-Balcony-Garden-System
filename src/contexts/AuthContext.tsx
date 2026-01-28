import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  userLoggedIn: boolean;
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

  useEffect(() => {
    console.log("🔐 AuthContext: Setting up auth state listener...");
    
    let timeoutCleared = false;
    
    // Set a timeout to ensure the app loads even if Firebase is slow
    const timeout = setTimeout(() => {
      if (loading && !timeoutCleared) {
        console.warn("⚠️ Firebase auth initialization timeout, loading app anyway");
        setLoading(false);
      }
    }, 5000); // Increased to 5 seconds

    // Subscribe to auth state changes
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
  }, []);

  const value = {
    currentUser,
    loading,
    userLoggedIn: !!currentUser
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
