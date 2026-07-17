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
    <nav aria-label="Horizontal Navigation" className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-[#E5E7EB] dark:border-slate-800 px-4 md:px-8 py-2.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-none py-1 select-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentSection === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectSection(tab.id)}
              className={`relative px-4 py-2.5 rounded-2xl text-xs md:text-sm font-semibold tracking-tight whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? "text-[#4285F4] dark:text-blue-400 font-extrabold bg-blue-50/80 dark:bg-blue-950/40"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 font-medium"
              }`}
            >
              <Icon 
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isActive ? "text-[#4285F4] dark:text-blue-400 scale-110" : "text-slate-400 dark:text-slate-500"
                }`} 
              />
              <span>{tab.label}</span>

              {isActive && (
                <motion.span
                  layoutId="activeNavigationTab"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#4285F4] dark:bg-blue-400 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
