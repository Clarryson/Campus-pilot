import React, { useState } from "react";
import { Search, Bell, History, Sparkles, Calendar, Globe } from "lucide-react";

interface TopBarProps {
  notificationsCount: number;
  onBellClick: () => void;
  googleUser: any;
  onSearch?: (term: string) => void;
  onNavigate?: (section: string) => void;
}

export default function TopBar({ 
  notificationsCount, 
  onBellClick, 
  googleUser, 
  onSearch,
  onNavigate
}: TopBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="border-b border-slate-150 dark:border-slate-850 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 transition-all duration-300 z-20">
      
      {/* Left: Dynamic Greetings matching user specifications */}
      <div className="flex flex-col gap-0.5 text-left select-none">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-sans leading-tight">
          Good Morning, Clarryson <span className="animate-wiggle inline-block">👋</span>
        </h2>
        <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="font-bold">University of Embu</span>
          <span className="text-slate-300 dark:text-slate-700 font-bold">•</span>
          <span>Computer Science</span>
          <span className="text-slate-300 dark:text-slate-700 font-bold">•</span>
          <span>Year 2</span>
          <span className="text-slate-300 dark:text-slate-700 font-bold">•</span>
          <span>Semester 1</span>
        </div>
      </div>

      {/* Right Side Widgets: Global Search, Calendar & Gemma Badges, Notification, Avatar */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 ml-auto md:ml-0">
        
        {/* Global Search box */}
        <div className="relative w-full sm:w-56 lg:w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-3.5 w-3.5 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder="Search classes, exams, notes..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 text-xs text-slate-900 dark:text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500/50 placeholder-slate-400 font-medium"
          />
        </div>

        {/* Dynamic status tags */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Calendar status tag */}
          <span className={`px-2.5 py-1 text-[9px] font-mono font-bold rounded-lg border flex items-center gap-1.5 ${
            googleUser 
              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-amber-50 dark:bg-amber-950/20 border-amber-500/20 text-amber-600 dark:text-amber-400"
          }`}>
            <Calendar className="h-3 w-3" />
            <span>{googleUser ? "GCal Synced" : "GCal Inactive"}</span>
          </span>

          {/* Gemma Status tag */}
          <span className="px-2.5 py-1 text-[9px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-150 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>Gemma 4 OS Live</span>
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-150 dark:bg-slate-850 hidden sm:block" />

        {/* Notification Bell */}
        <button 
          onClick={onBellClick}
          className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-950 rounded-xl transition-all cursor-pointer"
          title="Notification Stream"
        >
          <Bell className="h-4.5 w-4.5" />
          {notificationsCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white dark:border-[#0F172A] animate-bounce">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* History log navigation shortcuts */}
        <button 
          onClick={() => onNavigate?.("ai-workspace")}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-950 rounded-xl transition-all cursor-pointer"
          title="Gemma Reasoning Log"
        >
          <History className="h-4.5 w-4.5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-1">
          {googleUser?.photoURL ? (
            <img 
              src={googleUser.photoURL} 
              alt="User profile" 
              referrerPolicy="no-referrer" 
              className="h-8 w-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md object-cover cursor-pointer"
              onClick={() => onNavigate?.("settings")}
            />
          ) : (
            <div 
              onClick={() => onNavigate?.("settings")}
              className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 border border-blue-500/20 flex items-center justify-center text-white text-xs font-bold font-mono cursor-pointer"
            >
              CC
            </div>
          )}
        </div>

      </div>

    </header>
  );
}
