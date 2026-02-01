// Enhanced Navigation Component with Glassmorphism
// Demonstrates the new design system in action

import { useState } from 'react';
import { GlassButton, GlassNavItem } from './ui/GlassUI';
import { Menu, X, Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export function EnhancedNavigation() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { id: 'marketplace', label: 'Marketplace', href: '/marketplace' },
    { id: 'community', label: 'Community', href: '/community' },
    { id: 'garden', label: 'My Garden', href: '/garden' },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate('/');
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 text-white font-bold text-xl hover:text-green-400 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:inline">Bloomify</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <GlassNavItem
                key={link.id}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </GlassNavItem>
            ))}
          </div>

          {/* User Menu / Auth */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {currentUser.displayName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm text-gray-300">{currentUser.displayName || 'User'}</span>
                </div>
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </GlassButton>
              </div>
            ) : (
              <>
                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:block"
                >
                  Sign In
                </GlassButton>
                <GlassButton
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                </GlassButton>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/50 backdrop-blur-lg border-b border-white/10 animate-fade-in-down">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition"
              >
                {link.label}
              </button>
            ))}
            <hr className="border-white/10 my-2" />
            {!currentUser && (
              <div className="space-y-2">
                <GlassButton
                  variant="secondary"
                  size="md"
                  className="w-full"
                  onClick={() => handleNavClick('/dashboard')}
                >
                  Sign In
                </GlassButton>
                <GlassButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => handleNavClick('/dashboard')}
                >
                  Get Started
                </GlassButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
