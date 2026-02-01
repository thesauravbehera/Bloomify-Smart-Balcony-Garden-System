import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navigation } from "./components/navigation";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import { CommunityHub } from "./components/CommunityHub";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UserJourneyProvider } from "./contexts/UserJourneyContext";
import { Toaster } from "sonner";
import { GamificationHub } from "./components/GamificationHub";
import { ARBalconyScanner } from "./components/ARBalconyScanner";
import { initializeAnalytics, cleanupAnalytics } from "./services/analyticsService";
import "./styles/designSystem.css";

// Initialize analytics service
initializeAnalytics({
  apiEndpoint: import.meta.env.VITE_ANALYTICS_API || '/api/analytics',
  batchSize: 50,
  batchInterval: 30000,
  enableLocalStorage: true,
  enableConsoleLogging: import.meta.env.DEV,
});

export default function App() {
  useEffect(() => {
    // Cleanup analytics on unmount
    return () => {
      cleanupAnalytics();
    };
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <UserJourneyProvider>
          <Router>
            <div className="min-h-screen bg-[#020617]">
              <Navigation />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/community" element={<CommunityHub />} />
                <Route path="/garden" element={<GamificationHub />} />
                <Route path="/scanner" element={<ARBalconyScanner />} />
              </Routes>
              <Toaster position="bottom-right" theme="dark" />
            </div>
          </Router>
        </UserJourneyProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
