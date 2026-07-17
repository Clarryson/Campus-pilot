import React, { useState, useEffect } from "react";
import { 
  Search, 
  Bell, 
  Sparkles, 
  Calendar, 
  Settings, 
  Moon, 
  Sun, 
  Cpu, 
  UserCircle,
  Menu
} from "lucide-react";

interface TopBarProps {
  notificationsCount: number;
  onBellClick: () => void;
  googleUser: any;
  onSearch?: (term: string) => void;
  onNavigate?: (section: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleSidebar?: () => void;
}

export default function TopBar({ 
  notificationsCount, 
  onBellClick, 
  googleUser, 
  onSearch,
  onNavigate,
  theme,
  onToggleTheme,
  onToggleSidebar
}: TopBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // Listen for Ctrl+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById("global-search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="border-b border-[#E5E7EB] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 md:px-6 py-2.5 flex items-center justify-between gap-2 md:gap-4 shrink-0 z-40 transition-all duration-300">
      
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          aria-label="Open Left Panel Navigation"
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div 
          onClick={() => onNavigate?.("dashboard")}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="relative shrink-0">
            <img 
              src="/assets/logo.jpg" 
              alt="CampusPilot AI Logo" 
              className="h-9 w-9 rounded-xl object-cover shadow-md shadow-blue-500/15 border border-blue-500/20 group-hover:scale-105 transition-transform" 
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#34A853] border-2 border-white dark:border-slate-900 animate-pulse" title="Gemma 4 Core Active" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-white leading-none">
                CampusPilot <span className="text-[#4285F4]">AI</span>
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#4285F4] dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/40 text-[10px] font-mono font-bold tracking-wider uppercase">
                Gemma 4 OS
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 hidden lg:block">
              Your Autonomous Academic Agent
            </p>
          </div>
        </div>
      </div>

      {/* Center: Global Search */}
      <div className="flex-1 max-w-lg mx-auto w-full min-w-0">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            id="global-search-input"
            type="text"
            placeholder="Search or ask Gemma... (Ctrl+K)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#E5E7EB] dark:border-slate-800 text-sm text-slate-900 dark:text-white rounded-2xl pl-10 pr-14 py-2 focus:outline-none focus:border-[#4285F4] focus:ring-2 focus:ring-[#4285F4]/20 placeholder-slate-400 font-medium transition-all"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-xs">
              Ctrl K
            </kbd>
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        
        {/* Gemma Status Indicator — hidden on mobile to save space */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/50 dark:border-blue-800/50 text-xs font-semibold text-[#4285F4] dark:text-blue-300 shadow-xs animate-glow">
          <span className="text-sm">🧠</span>
          <span className="font-mono font-bold tracking-tight">Gemma Active</span>
          <span className="h-2 w-2 rounded-full bg-[#34A853] animate-ping" />
        </div>

        {/* Google Calendar Status — icon-only on mobile */}
        <div 
          onClick={() => onNavigate?.("google-calendar")}
          className={`flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-2xl border text-xs font-semibold cursor-pointer transition-all shadow-xs ${
            googleUser
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-800/50 text-[#34A853] dark:text-emerald-300 hover:bg-emerald-100/60"
              : "bg-amber-50 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-800/50 text-[#FBBC05] dark:text-amber-300 hover:bg-amber-100/60"
          }`}
          title="Google Calendar Synchronization Status"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span className="hidden md:inline font-mono font-bold">{googleUser ? "GCal Synced" : "GCal Inactive"}</span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-[#E5E7EB] dark:bg-slate-800 hidden sm:block" />

        {/* Notifications Bell */}
        <button 
          onClick={onBellClick}
          aria-label="View Notifications"
          className="relative p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer"
          title="Notification Center"
        >
          <Bell className="h-5 w-5" />
          {notificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-[#EA4335] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-bounce">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* Dark Mode Toggle */}
        <button 
          onClick={onToggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer"
          title={theme === 'dark' ? "Switch to White Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-amber-400 animate-spin-slow" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600" />
          )}
        </button>

        {/* Settings Button */}
        <button 
          onClick={() => onNavigate?.("settings")}
          aria-label="Open Settings"
          className="p-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all cursor-pointer"
          title="AI & System Settings"
        >
          <Settings className="h-5 w-5" />
        </button>

        {/* Profile Avatar & Greeting */}
        <div 
          onClick={() => onNavigate?.("settings")}
          className="flex items-center gap-2.5 pl-2 py-1 pr-3 bg-[#F8FAFC] dark:bg-slate-950 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl cursor-pointer hover:border-[#4285F4] transition-all shadow-xs group"
        >
          {googleUser?.photoURL ? (
            <img 
              src={googleUser.photoURL} 
              alt="User profile" 
              referrerPolicy="no-referrer" 
              className="h-8 w-8 rounded-xl object-cover border border-blue-500/30"
            />
          ) : (
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-[#4285F4] to-[#7C4DFF] flex items-center justify-center text-white text-xs font-black font-mono shadow-xs">
              {googleUser && googleUser.displayName ? googleUser.displayName.slice(0, 2).toUpperCase() : "ST"}
            </div>
          )}
          <div className="text-left hidden lg:block">
            <span className="text-xs font-black text-slate-900 dark:text-white block leading-none">
              {googleUser && googleUser.displayName ? googleUser.displayName : "Student"}
            </span>
            <span className="text-[10px] font-mono text-[#34A853] block mt-0.5">
              Online • Academic Workspace
            </span>
          </div>
        </div>

      </div>

    </header>
  );
}
