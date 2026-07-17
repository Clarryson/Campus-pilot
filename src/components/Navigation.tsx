import React from "react";
import { 
  Home, 
  Calendar, 
  Layers, 
  FileText, 
  BookOpen, 
  Folder, 
  Sparkles, 
  GraduationCap, 
  CalendarDays, 
  BookMarked, 
  CalendarClock 
} from "lucide-react";
import { motion } from "motion/react";

interface NavigationProps {
  currentSection: string;
  onSelectSection: (section: string) => void;
}

export default function Navigation({ currentSection, onSelectSection }: NavigationProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "schedule", label: "Today's Schedule", icon: Calendar },
    { id: "planner", label: "Weekly Planner", icon: Layers },
    { id: "examinations", label: "Examinations", icon: FileText },
    { id: "study-planner", label: "Study Planner", icon: BookOpen },
    { id: "documents", label: "Documents", icon: Folder },
    { id: "ai-workspace", label: "AI Workspace", icon: Sparkles },
    { id: "scholarships", label: "Scholarships", icon: GraduationCap },
    { id: "events", label: "Campus Events", icon: CalendarDays },
    { id: "handbook", label: "Student Handbook", icon: BookMarked },
    { id: "google-calendar", label: "Google Calendar", icon: CalendarClock },
  ];

  return (
    <aside aria-label="Left Sidebar Navigation" className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-[#E5E7EB] dark:border-slate-800 flex flex-col justify-between py-6 px-3.5 overflow-y-auto transition-all duration-300">
      <div className="space-y-1.5 select-none">
        <div className="px-3 pb-3 mb-2 border-b border-slate-100 dark:border-slate-800/60">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
            Academic Modules
          </p>
        </div>

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSection === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectSection(tab.id)}
              className={`w-full relative px-4 py-3 rounded-2xl text-xs font-sans font-semibold tracking-tight flex items-center justify-start gap-3.5 transition-all cursor-pointer text-left ${
                isActive
                  ? "text-[#4285F4] dark:text-blue-400 font-extrabold bg-blue-50/90 dark:bg-blue-950/50 shadow-sm shadow-blue-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 font-medium"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeSidebarRail"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#4285F4] dark:bg-blue-400 rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}

              <Icon 
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isActive ? "text-[#4285F4] dark:text-blue-400 scale-110" : "text-slate-400 dark:text-slate-500"
                }`} 
              />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer Info */}
      <div className="mt-8 px-3 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-left">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-sans font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Gemma 4 OS Active</span>
        </div>
      </div>
    </aside>
  );
}
