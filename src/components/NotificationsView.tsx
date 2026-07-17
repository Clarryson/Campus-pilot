import React, { useState } from "react";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Calendar, 
  Award, 
  FileText, 
  Clock, 
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { NotificationItem } from "../types";

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkRead: () => void;
}

export default function NotificationsView({ notifications, onMarkRead }: NotificationsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Notifications" },
    { id: "Timetable", label: "Timetable", icon: FileText },
    { id: "Exams", label: "Exams", icon: Clock },
    { id: "Assignments", label: "Assignments", icon: CheckCircle },
    { id: "Calendar", label: "Calendar", icon: Calendar },
    { id: "Scholarships", label: "Scholarships", icon: Award },
    { id: "Events", label: "Events", icon: Bell },
  ];

  // Map simulated alerts for UI high fidelity if database is empty
  const defaultNotifications: NotificationItem[] = [
    {
      id: "not-1",
      message: "Gemma auto-resolved examination conflict: Staged Calculus & Statistics buffer weights to avoid load crash.",
      type: "success",
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: "not-2",
      message: "New Scholarship Recommended: STEM Research Fellowship Grant matching 98%. Deadline in 14 days.",
      type: "info",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    {
      id: "not-3",
      message: "Google Calendar synchronization fully complete: Created CSC 211 & CSC 212 lectures.",
      type: "success",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true
    },
    {
      id: "not-4",
      message: "Timetable update detected: Lecture Venue for CSC 213 changed from Hall 1 to Tech Tower Annex room 12.",
      type: "warning",
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      read: false
    }
  ];

  const activeNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  // Filter logic based on text search and categories
  const filteredNotifications = activeNotifications.filter(item => {
    const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeCategory === "all") return matchesSearch;
    
    // Categorize based on keywords
    const matchesCategory = item.message.toLowerCase().includes(activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const unreadCount = filteredNotifications.filter(n => !n.read).length;

  return (
    <div className="page-content space-y-8 text-left transition-colors duration-300">
      
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 text-[10px] font-mono font-bold tracking-wider uppercase border border-purple-500/20">
              System Stream
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
            AI Notification Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Audit autonomous event updates, schedule comparisons, venue changes, and funding opportunities as they happen.
          </p>
        </div>

        {/* Clear buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onMarkRead}
            disabled={unreadCount === 0}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
          >
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            <span>Clear Unread</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Categories & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Categories Selector Left */}
        <div className="lg:col-span-3 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-2 mb-4">
            Filter Streams
          </h3>
          
          <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all shrink-0 text-left ${
                    isActive 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/15" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-950 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications list right */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Search Box */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Search notifications, warnings, or scholarship opportunities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
            />
          </div>

          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-16 text-center space-y-3">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-600">
                  <Bell className="h-6 w-6" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Stream holds no matching items</div>
              </div>
            ) : (
              filteredNotifications.map((item) => {
                const isUnread = !item.read;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all duration-250 flex items-start justify-between gap-4 ${
                      isUnread 
                        ? "bg-indigo-50/20 dark:bg-indigo-950/10 border-indigo-500/20 shadow-md shadow-indigo-500/2" 
                        : "bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850 opacity-80"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Icon container */}
                      <div className={`p-2.5 rounded-xl border shrink-0 ${
                        item.type === "success" ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" :
                        item.type === "warning" ? "bg-amber-50 dark:bg-amber-950/20 border-amber-500/20 text-amber-600 dark:text-amber-400" :
                        item.type === "alert" ? "bg-red-50 dark:bg-red-950/20 border-red-500/20 text-red-600 dark:text-red-400" :
                        "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                      }`}>
                        {item.type === "success" && <CheckCircle className="h-4.5 w-4.5" />}
                        {item.type === "warning" && <AlertTriangle className="h-4.5 w-4.5" />}
                        {item.type === "alert" && <AlertTriangle className="h-4.5 w-4.5" />}
                        {item.type === "info" && <Info className="h-4.5 w-4.5" />}
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans font-medium text-left">
                          {item.message}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span>{new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                          {isUnread && (
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isUnread && (
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[9px] font-mono font-bold uppercase">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
