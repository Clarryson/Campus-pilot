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
  CalendarClock,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationProps {
  currentSection: string;
  onSelectSection: (section: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Navigation({ currentSection, onSelectSection, isOpen = false, onClose }: NavigationProps) {
  // Grouped Navigation Modules for cleaner left panel hierarchy
  const groups = [
    {
      title: "Overview & AI",
      items: [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "ai-workspace", label: "AI Workspace", icon: Sparkles },
      ]
    },
    {
      title: "Scheduling & Exams",
      items: [
        { id: "schedule", label: "Today's Schedule", icon: Calendar },
        { id: "planner", label: "Weekly Planner", icon: Layers },
        { id: "examinations", label: "Examinations", icon: FileText },
        { id: "study-planner", label: "Study Planner", icon: BookOpen },
        { id: "google-calendar", label: "Google Calendar", icon: CalendarClock },
      ]
    },
    {
      title: "Resources & Campus",
      items: [
        { id: "documents", label: "Documents", icon: Folder },
        { id: "scholarships", label: "Scholarships", icon: GraduationCap },
        { id: "events", label: "Campus Events", icon: CalendarDays },
        { id: "handbook", label: "Student Handbook", icon: BookMarked },
      ]
    }
  ];

  const handleTabClick = (sectionId: string) => {
    onSelectSection(sectionId);
    if (onClose) {
      onClose();
    }
  };

  const sidebarContent = (
    <aside aria-label="Left Sidebar Navigation" className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-[#E5E7EB] dark:border-slate-800 flex flex-col justify-between h-full py-6 px-3.5 overflow-y-auto scrollbar-none transition-all duration-300 select-none">
      <div className="space-y-6">
        
        {/* Mobile drawer header (only visible on mobile drawer view) */}
        <div className="flex md:hidden items-center justify-between px-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.jpg" alt="Logo" className="h-7 w-7 rounded-lg object-cover" />
            <span className="font-black text-sm text-slate-900 dark:text-white">CampusPilot <span className="text-[#4285F4]">AI</span></span>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Grouped Navigation Sections */}
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="px-3 pb-1.5 border-b border-slate-100/60 dark:border-slate-800/40 mb-1.5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                {group.title}
              </p>
            </div>

            <div className="space-y-0.5">
              {group.items.map((tab) => {
                const Icon = tab.icon;
                const isActive = currentSection === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full relative px-3.5 py-2.5 rounded-xl text-xs font-sans font-semibold tracking-tight flex items-center justify-start gap-3 transition-all cursor-pointer text-left group ${
                      isActive
                        ? "text-[#4285F4] dark:text-blue-400 font-extrabold bg-blue-50/90 dark:bg-blue-950/50 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60 font-medium"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarRail"
                        className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#4285F4] dark:bg-blue-400 rounded-r-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}

                    <Icon 
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isActive ? "text-[#4285F4] dark:text-blue-400 scale-110" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                      }`} 
                    />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      </div>

      {/* Sidebar Footer: Gemma Status */}
      <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/60 text-left">
        
        {/* Gemma Status Pill */}
        <div className="px-3 py-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-sans font-semibold">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Gemma 4 OS Active</span>
          </div>
          <span className="font-mono text-[9px] text-slate-400 dark:text-slate-600">v2.4</span>
        </div>

      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Left Panel Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden h-full shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
