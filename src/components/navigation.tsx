import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Leaf, Menu, X, Play, UserCircle2, LogOut, Users, Sparkles, Camera, Trophy, LayoutDashboard, Sprout, ShoppingCart, ChevronRight, Languages } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { logoutUser } from "../lib/auth/logout";
import { toast } from "sonner@2.0.3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, userLoggedIn } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      toast.success("Logged out successfully");
    } else {
      toast.error("Logout failed", { description: result.error });
    }
  };

  const getUserInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return currentUser?.email?.charAt(0).toUpperCase() || "U";
  };

  const navItems = [
    { label: t('nav_overview'), href: "/", icon: Sparkles },
    { label: t('nav_dashboard'), href: "/dashboard", icon: LayoutDashboard, protected: true },
    { label: t('nav_garden'), href: "/garden", icon: Sprout, protected: true },
    { label: t('nav_community'), href: "/community", icon: Users },
    { label: t('nav_market'), href: "/marketplace", icon: ShoppingCart }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`glass px-6 h-16 rounded-3xl flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-slate-950/40 border-emerald-500/20 shadow-xl" : "bg-white/5 border-white/5"
        }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] via-[#0D9488] to-[#0369A1] rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-emerald-500/20">
              <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-['Clash_Display']">
              BLOOMIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.protected && !userLoggedIn) return null;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative group ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 font-['Clash_Display'] font-medium uppercase tracking-wider">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/5 rounded-full">
                  <Languages className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-white/10 text-white min-w-[120px] rounded-2xl">
                <DropdownMenuItem onClick={() => setLanguage('en')} className={`rounded-xl cursor-pointer ${language === 'en' ? 'bg-emerald-500/20 text-emerald-400' : ''}`}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')} className={`rounded-xl cursor-pointer ${language === 'hi' ? 'bg-emerald-500/20 text-emerald-400' : ''}`}>हिन्दी</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('kn')} className={`rounded-xl cursor-pointer ${language === 'kn' ? 'bg-emerald-500/20 text-emerald-400' : ''}`}>ಕನ್ನಡ</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ta')} className={`rounded-xl cursor-pointer ${language === 'ta' ? 'bg-emerald-500/20 text-emerald-400' : ''}`}>தமிழ்</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {userLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 p-1.5 pl-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                  >
                    <span className="text-xs font-bold text-white/60 tracking-widest uppercase">{currentUser?.displayName?.split(' ')[0] || "MEMBER"}</span>
                    <Avatar className="w-8 h-8 border border-emerald-500/30">
                      <AvatarImage src={currentUser?.photoURL || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-[10px] font-bold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 glass border-emerald-500/20 text-white p-2 rounded-2xl">
                  <DropdownMenuLabel className="px-4 py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold tracking-tight">{currentUser?.displayName || "User"}</p>
                      <p className="text-[10px] text-white/40 truncate uppercase tracking-widest font-bold">{currentUser?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="rounded-xl focus:bg-white/10 focus:text-white transition-colors cursor-pointer py-3 px-4">
                    <UserCircle2 className="w-4 h-4 mr-3 text-emerald-400" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl focus:bg-red-500/10 focus:text-red-400 transition-colors cursor-pointer py-3 px-4 text-red-400">
                    <LogOut className="w-4 h-4 mr-3" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  className="text-white/50 hover:text-white hover:bg-white/5 rounded-2xl px-6"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Login
                </Button>
                <Button 
                  className="bg-white text-black hover:bg-white/90 font-bold px-8 rounded-2xl shadow-lg shadow-white/5 transition-all active:scale-95"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Join Collective
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white glass rounded-xl border-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm glass-strong z-50 p-10 border-l border-emerald-500/20"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-2xl font-bold tracking-tighter text-premium">BLOOMIFY</span>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center justify-between text-2xl font-semibold text-white/60 hover:text-white transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-['Clash_Display'] uppercase tracking-tight group-hover:translate-x-2 transition-transform">{item.label}</span>
                  <ChevronRight className="w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:text-emerald-400" />
                </Link>
              ))}
              {/* Mobile Lang Selection */}
              <div className="pt-8 border-t border-white/10 flex gap-4">
                 {['en', 'hi', 'kn', 'ta'].map(l => (
                   <button 
                    key={l}
                    onClick={() => setLanguage(l as any)}
                    className={`text-xs font-black uppercase tracking-widest ${language === l ? 'text-emerald-400' : 'text-white/20'}`}
                   >
                     {l}
                   </button>
                 ))}
              </div>
            </div>

            <div className="absolute bottom-12 left-10 right-10 space-y-4">
              {userLoggedIn ? (
                <Button onClick={handleLogout} variant="outline" className="w-full border-white/10 text-white py-8 rounded-2xl">
                  Log Out
                </Button>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)} className="w-full bg-white text-black py-8 font-black rounded-2xl tracking-[0.2em]">
                  GET STARTED
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </motion.nav>
  );
}