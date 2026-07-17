import React from "react";
import { 
  Home,
  MessageSquare,
  Calendar,
  Users,
  Folder,
  FileText,
  BookOpen,
  Sparkles,
  Settings,
  Moon,
  Sun,
  ChevronRight,
  ChevronRightCircle,
  HelpCircle,
  Compass
} from "lucide-react";

interface SidebarProps {
  currentSection: string;
  onSelectSection: (section: string) => void;
  onAskAI: () => void;
  onLogout: () => void;
  googleUser: any;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Sidebar({ 
  currentSection, 
  onSelectSection, 
  onAskAI, 
  onLogout,
  googleUser,
  theme,
  onToggleTheme
}: SidebarProps) {

  // Menu items list mapping the exact labels and icons in the image to our functional application sections
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "notifications", label: "Notifications", icon: MessageSquare },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "planner", label: "Study Planner", icon: Users },
    { id: "documents", label: "Documents", icon: Folder },
    { id: "examinations", label: "Examinations", icon: FileText },
    { id: "scholarships", label: "Scholarships", icon: BookOpen },
    { id: "ai-workspace", label: "AI Workspace", icon: Sparkles },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#0B0F19] border-r border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between h-full py-6 px-4 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-none z-30 select-none transition-colors duration-300">
      
      {/* Top Section: Brand & Navigation */}
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[85%] scrollbar-none text-left">
        
        {/* Brand Logo matching picture */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectSection("dashboard")}>
            <div className="h-9 w-9 bg-[#009BF5] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/10">
              <Compass className="h-5.5 w-5.5" />
            </div>
            <div className="text-left">
              <h1 className="text-sm font-black tracking-tight text-slate-900 dark:text-white leading-none">
                CampusPilot
              </h1>
              <p className="text-[9px] text-[#009BF5] font-black tracking-widest uppercase mt-0.5 font-mono">
                AI
              </p>
            </div>
          </div>

          {/* Minimalist Theme toggle */}
          <button 
            onClick={onToggleTheme}
            className="p-1.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-blue-500 cursor-pointer transition-colors"
            title={theme === 'light' ? "Dark Mode" : "Light Mode"}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1 px-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer group ${
                  isActive 
                    ? "bg-[#009BF5]/10 dark:bg-blue-950/40 text-[#009BF5] dark:text-blue-400 font-extrabold" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon 
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      isActive 
                        ? "text-[#009BF5] dark:text-blue-400" 
                        : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`} 
                  />
                  <span className="font-sans">{item.label}</span>
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#009BF5]" />
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Section: Mejora tu Plan banner matching the picture */}
      <div className="px-1 text-left">
        
        {/* Blue Promotion Banner Card matching the picture */}
        <div className="relative bg-gradient-to-br from-[#009BF5] via-[#009BF5] to-[#1A3B8B] text-white p-4.5 rounded-[24px] shadow-lg overflow-hidden select-none flex flex-col justify-between min-h-[140px] group">
          
          {/* Circular decorations overlay */}
          <div className="absolute right-[-10px] top-[-10px] h-16 w-16 bg-white/10 rounded-full blur-md" />
          <div className="absolute left-[-20px] bottom-[-20px] h-24 w-24 bg-white/5 rounded-full blur-md" />

          {/* Logo badge with up-right arrow circle */}
          <div className="flex items-center justify-between relative z-10">
            <div className="h-7 w-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white font-black text-xs">
              CP+
            </div>
            <button className="text-white hover:text-white/80 transition-colors">
              <ChevronRightCircle className="h-4.5 w-4.5" />
            </button>
          </div>

          <div className="space-y-1 relative z-10 mt-3">
            <h4 className="text-xs font-black tracking-tight leading-snug">
              Upgrade your Plan
            </h4>
            <p className="text-[10px] text-white/80 leading-relaxed font-sans">
              And access advanced features and benefits tailored for you.
            </p>
          </div>

          <button 
            onClick={() => onSelectSection("settings")}
            className="w-full mt-3 py-2 bg-white hover:bg-slate-50 text-[#009BF5] text-[10px] font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Plans</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          </button>

        </div>

      </div>

    </aside>
  );
}
