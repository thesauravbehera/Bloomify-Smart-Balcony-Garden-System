import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navigation } from "./components/navigation";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import { CommunityHub } from "./components/CommunityHub";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "sonner@2.0.3";
import { GamificationHub } from "./components/GamificationHub";
import { ARBalconyScanner } from "./components/ARBalconyScanner";

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
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
      </AuthProvider>
    </LanguageProvider>
  );
}
