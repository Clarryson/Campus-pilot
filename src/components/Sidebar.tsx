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
  HelpCircle
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
    { id: "dashboard", label: "Home", icon: Home },
    { id: "notifications", label: "Announcements", icon: MessageSquare },
    { id: "schedule", label: "Calendar", icon: Calendar },
    { id: "planner", label: "Students", icon: Users },
    { id: "documents", label: "My Files", icon: Folder },
    { id: "examinations", label: "Documents", icon: FileText },
    { id: "scholarships", label: "Library", icon: BookOpen },
    { id: "ai-workspace", label: "AI Assistant", icon: Sparkles },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#0B0F19] border-r border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between h-full py-6 px-4 shrink-0 shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-none z-30 select-none transition-colors duration-300">
      
      {/* Top Section: Brand & Navigation */}
      <div className="flex flex-col gap-6 overflow-y-auto max-h-[85%] scrollbar-none text-left">
        
        {/* Brand Logo matching picture */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectSection("dashboard")}>
            <div className="h-9 w-9 bg-[#0092FF] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/10">
              N
            </div>
            <div className="text-left">
              <h1 className="text-sm font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Notasnet
              </h1>
              <p className="text-[9px] text-[#0092FF] font-black tracking-widest uppercase mt-0.5 font-mono">
                CHILE
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
                    ? "bg-[#E6F4FF] dark:bg-blue-950/40 text-[#0084FF] dark:text-blue-400 font-extrabold" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon 
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      isActive 
                        ? "text-[#0084FF] dark:text-blue-400" 
                        : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`} 
                  />
                  <span className="font-sans">{item.label}</span>
                </div>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0084FF]" />
                )}
              </button>
            );
          })}
        </nav>

      </div>

    </aside>
  );
}
