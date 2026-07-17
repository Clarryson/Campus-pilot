import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  ChevronDown, 
  ArrowUpRight, 
  Sparkles, 
  Plus, 
  Check, 
  CheckCircle, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Calendar as CalendarIcon, 
  Users, 
  Folder, 
  FileText, 
  BookOpen, 
  Wallet, 
  GraduationCap, 
  Info, 
  ExternalLink, 
  X, 
  Settings,
  MoreHorizontal
} from "lucide-react";
import { GemmaActivityLog, TimetableClass, ExamEvent, ReminderItem } from "../types";

interface DashboardViewProps {
  gemmaActivities: GemmaActivityLog[];
  timetable: TimetableClass[];
  exams: ExamEvent[];
  reminders: ReminderItem[];
  onNavigate: (section: string) => void;
  onAddQuickReminder: (text: string) => void;
}

export default function DashboardView({ 
  gemmaActivities, 
  timetable, 
  exams, 
  reminders, 
  onNavigate,
  onAddQuickReminder
}: DashboardViewProps) {
  // Calendar day selection state
  const [selectedDay, setSelectedDay] = useState<string>("Feb 28");
  
  // "Lo nuevo" newsfeed filter state
  const [newsFilter, setNewsFilter] = useState<string>("Todos");

  // Interaction states for cards
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isMatriculado, setIsMatriculado] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Quick tasks list state
  const [quickTasks, setQuickTasks] = useState<string[]>([
    "Review Probability syllabus",
    "Sign report card",
    "Prepare uniform for civic assembly"
  ]);
  const [newTaskText, setNewTaskText] = useState<string>("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      setQuickTasks([...quickTasks, newTaskText.trim()]);
      onAddQuickReminder(newTaskText.trim());
      setNewTaskText("");
    }
  };

  const handleRemoveTask = (index: number) => {
    setQuickTasks(quickTasks.filter((_, i) => i !== index));
  };

  // Calendar timeline events list
  const calendarEventsMap: { [key: string]: any[] } = {
    "Feb 28": [
      {
        id: "ev-1",
        time: "08:30 - 10:00 AM",
        title: "Religion Class",
        room: "Grade 12A - Hc",
        type: "religion",
        iconColor: "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
        description: "Study of contemporary ethical currents and the social role of faith."
      },
      {
        id: "ev-2",
        time: "10:00 - 12:30 PM",
        title: "Probability & Statistics Class",
        room: "Grade 12A - Hc",
        type: "math",
        iconColor: "bg-slate-100 text-slate-600 dark:bg-slate-900/60 dark:text-slate-300",
        description: "Introduction to continuous random variables and probability density functions."
      },
      {
        id: "ev-3",
        time: "12:30 - 01:30 PM",
        title: "Break",
        room: "Main Courtyard",
        type: "break",
        iconColor: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
      },
      {
        id: "ev-4",
        time: "01:30 - 02:30 PM",
        title: "Civic Assembly with Teachers",
        room: "School Auditorium",
        type: "civic",
        iconColor: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
        description: "Official ceremony marking the start of the academic semester with the faculty."
      }
    ],
    "Feb 29": [
      {
        id: "ev-5",
        time: "08:30 - 10:00 AM",
        title: "History Class",
        room: "Conference Room B",
        type: "history",
        iconColor: "bg-orange-100 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400",
        description: "Critical analysis of the 19th-century national independence processes."
      },
      {
        id: "ev-6",
        time: "10:15 - 11:45 AM",
        title: "Advanced Robotics Workshop",
        room: "Innovation Lab",
        type: "tech",
        iconColor: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-400",
        description: "Microcontroller programming using ultrasonic sensors."
      },
      {
        id: "ev-7",
        time: "12:00 - 01:30 PM",
        title: "Applied Computing",
        room: "Systems Lab 3",
        type: "math",
        iconColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400",
        description: "Development of statistical analysis scripts using scientific libraries."
      }
    ],
    "Mar 01": [
      {
        id: "ev-8",
        time: "09:00 - 11:00 AM",
        title: "Mathematics II Exam",
        room: "Grade 12A - Hc",
        type: "exam",
        iconColor: "bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400",
        description: "First midterm exam focused on definite and indefinite integrals."
      },
      {
        id: "ev-9",
        time: "11:15 - 12:45 PM",
        title: "Group Literature Workshop",
        room: "Central Library",
        type: "lit",
        iconColor: "bg-purple-100 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
        description: "Open debate and readings of modern Hispano-American authors."
      },
      {
        id: "ev-10",
        time: "01:00 - 02:30 PM",
        title: "Physical Education Class",
        room: "Indoor Gym",
        type: "sport",
        iconColor: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400",
        description: "General physical conditioning and volleyball rule practice."
      }
    ],
    "Mar 02": [
      {
        id: "ev-11",
        time: "10:00 - 12:00 PM",
        title: "Sports & Inclusion Workshop",
        room: "Auxiliary Sports Courts",
        type: "sport",
        iconColor: "bg-teal-100 text-teal-600 dark:bg-teal-950/30 dark:text-teal-400",
        description: "Adapted basketball clinic and recreational group dynamics."
      },
      {
        id: "ev-12",
        time: "12:15 - 02:00 PM",
        title: "Organic Chemistry Lab",
        room: "Science Lab",
        type: "chemistry",
        iconColor: "bg-pink-100 text-pink-600 dark:bg-pink-950/30 dark:text-pink-400",
        description: "Lab practices: simple distillation and synthesis of aromatic compounds."
      }
    ]
  };

  const activeEvents = calendarEventsMap[selectedDay] || [];

  // Feed items list
  const feedItems = [
    {
      id: "feed-1",
      title: "Holiday Schedule",
      category: "Announcement",
      badgeColor: "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400 border-green-200 dark:border-green-800/40",
      timeLabel: "Today",
      isUnread: true,
      description: "Dear members of Modelo School, for the new 2024 school year, we attach the holiday schedule for your preventive family planning.",
      icon: <CalendarIcon className="h-4.5 w-4.5 text-green-600 dark:text-green-400" />
    },
    {
      id: "feed-2",
      title: "Pending Process",
      category: "Service",
      badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-800/40",
      timeLabel: "Yesterday",
      description: "Reserve your student enrollment in advance to secure preferential classroom assignment for the 2026 cycle.",
      actionType: "matricula",
      icon: <Users className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />
    },
    {
      id: "feed-3",
      title: "Next Payment",
      category: "Wallet",
      badgeColor: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/40",
      timeLabel: "4d ago",
      description: "March tuition is available for immediate payment. Pay before the 5th to avoid administrative surcharges.",
      amount: "$204.00",
      actionType: "pago",
      icon: <Wallet className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
    },
    {
      id: "feed-4",
      title: "Grade for Maelys Leiva",
      category: "Grade",
      badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800/40",
      timeLabel: "Feb 28",
      description: "The student Maelys Leiva obtained a 7.0 (maximum grade) in the semester course of Religion and Ethical Education.",
      icon: <GraduationCap className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />
    }
  ];

  // Filter feed items based on selected tab
  const filteredFeedItems = newsFilter === "All" 
    ? feedItems 
    : feedItems.filter(item => item.category === newsFilter);

  return (
    <div className="flex-1 overflow-y-auto bg-[#F4F6FA] dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 text-left transition-colors duration-300">
      
      {/* Search and User Header Row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
            Academic Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            School cycle management, enrollments, and academic activities.
          </p>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <button className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer">
            <Search className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400" />
          </button>

          {/* Notifications Trigger */}
          <button 
            onClick={() => onNavigate("notifications")}
            className="h-10 w-10 relative flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer"
          >
            <Bell className="h-4.5 w-4.5 text-slate-500 dark:text-slate-400" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
          </button>

          {/* User Profile dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 pl-1 pr-2.5 py-1 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-950 transition-all cursor-pointer"
            >
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Maelys Leiva Avatar"
                referrerPolicy="no-referrer"
                className="h-7 w-7 rounded-full object-cover border border-slate-100" 
              />
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 py-2 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-850">
                  <p className="font-bold text-slate-900 dark:text-white">Maelys Leiva</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Guardian: Kinder A</p>
                </div>
                <button 
                  onClick={() => { onNavigate("settings"); setShowProfileMenu(false); }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  Settings
                </button>
                <button 
                  onClick={() => { onNavigate("handbook"); setShowProfileMenu(false); }}
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  School Handbook
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ==============================================
            COLUMN 1: Profile Banner, Metrics & Average Grade (col-span-4)
            ============================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Cordillera School Premium Banner Card */}
          <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-[32px] p-6 text-white overflow-hidden shadow-md aspect-[4/3] flex flex-col justify-between select-none group">
            
            {/* Background image overlay */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center mix-blend-overlay opacity-30 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
            
            {/* Soft gradient bottom fill */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* Top Row: School Badge Logo */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-white/20 shadow-inner">
                <span className="text-sm font-black tracking-widest font-mono text-indigo-200">CC</span>
              </div>
              <span className="bg-[#009BF5]/30 backdrop-blur-md text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-1 rounded-full border border-blue-400/20">
                2026 Period
              </span>
            </div>

            {/* Middle Row: Title "Cordillera School" */}
            <div className="relative z-10 text-left mt-4">
              <h3 className="text-2xl md:text-3xl font-black font-sans leading-tight tracking-tight text-white">
                Cordillera <br />School
              </h3>
            </div>

            {/* Bottom Row: User dropdown capsule */}
            <div className="relative z-10 bg-white hover:bg-slate-50 text-slate-800 p-2.5 rounded-2xl shadow-lg flex items-center justify-between gap-3 cursor-pointer select-none transition-all duration-300">
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Maelys Leiva"
                  className="h-8 w-8 rounded-full object-cover border border-slate-100" 
                />
                <div className="text-left min-w-0">
                  <p className="text-xs font-black text-slate-900 truncate">Maelys Leiva</p>
                  <p className="text-[10px] text-slate-500 font-medium truncate">Kinder A</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-blue-600 shrink-0" />
            </div>

          </div>

          {/* Dual Metrics Row */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Card 1: Attendance */}
            <div 
              onClick={() => onNavigate("schedule")}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-[24px] shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all cursor-pointer text-left flex flex-col justify-between min-h-[105px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Attendance</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-2">
                <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-sans leading-none">100%</h4>
                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1">Perfect attendance</p>
              </div>
            </div>

            {/* Card 2: Enrollment */}
            <div 
              onClick={() => setIsMatriculado(!isMatriculado)}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-5 rounded-[24px] shadow-sm hover:shadow-md hover:border-amber-500/30 transition-all cursor-pointer text-left flex flex-col justify-between min-h-[105px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Enrollment</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </div>
              <div className="mt-2">
                {isMatriculado ? (
                  <>
                    <h4 className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">ENROLLED</h4>
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1">Complete</p>
                  </>
                ) : (
                  <>
                    <h4 className="text-sm font-black text-amber-600 dark:text-amber-500 font-mono">Promoted</h4>
                    <p className="text-[9px] text-red-500 font-mono font-extrabold leading-none mt-0.5">Pending</p>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Card: Average Grade Gauge Meter */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-[32px] shadow-sm text-left relative flex flex-col justify-between min-h-[250px]">
            
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 dark:text-white">Average Grade</span>
              <button className="h-7 w-7 flex items-center justify-center bg-slate-950 hover:bg-slate-800 text-white rounded-full transition-colors">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Gauge SVG in the center */}
            <div className="relative flex flex-col items-center justify-center py-4">
              <svg className="w-40 h-24" viewBox="0 0 100 60">
                {/* Background track arc */}
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke="#E2E8F0" 
                  strokeWidth="8" 
                  strokeLinecap="round"
                  className="dark:stroke-slate-800"
                />
                {/* Highlight gauge green arc */}
                <path 
                  d="M 10 50 A 40 40 0 0 1 83 40" 
                  fill="none" 
                  stroke="#00D26A" 
                  strokeWidth="8.5" 
                  strokeLinecap="round"
                  strokeDasharray="125"
                  strokeDashoffset="20"
                />
              </svg>

              {/* Central Text Grade */}
              <div className="absolute bottom-2 text-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                  9.2
                </span>
                <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-black leading-none mt-0.5">Semester</p>
              </div>
            </div>

            {/* Smaller Grade Indicator Pills */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-3 border-t border-slate-100 dark:border-slate-850">
              
              <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-850/60 flex flex-col items-start gap-1">
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-bold uppercase text-[8px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>Best</span>
                </div>
                <span className="font-sans font-extrabold text-slate-700 dark:text-slate-300 truncate w-full">Spanish</span>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 font-mono">8.9</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-850/60 flex flex-col items-start gap-1">
                <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 font-bold uppercase text-[8px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  <span>Lowest</span>
                </div>
                <span className="font-sans font-extrabold text-slate-700 dark:text-slate-300 truncate w-full">Math</span>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-500 font-mono">7.6</span>
              </div>

            </div>

          </div>

        </div>

        {/* ==============================================
            COLUMN 2: "Events" Classes & Timeline (col-span-4)
            ============================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-[32px] shadow-sm text-left flex flex-col gap-6 min-h-[610px]">
            
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-sans flex items-center gap-2">
                Events
              </h3>
              <button className="h-7 w-7 flex items-center justify-center bg-slate-950 hover:bg-slate-800 text-white rounded-full transition-colors">
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Horizontal Date Picker Slider */}
            <div>
              <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none select-none">
                
                {/* Feb 28 (Today) */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">February</span>
                  <button 
                    onClick={() => setSelectedDay("Feb 28")}
                    className={`h-14 w-12 rounded-2xl flex flex-col justify-center items-center transition-all cursor-pointer font-sans text-xs ${
                      selectedDay === "Feb 28"
                        ? "bg-[#009BF5] text-white font-extrabold shadow-md shadow-blue-500/10"
                        : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-850"
                    }`}
                  >
                    <span className="text-[9px] block opacity-80 uppercase font-bold">Today</span>
                    <span className="text-[10px] block opacity-90 leading-none">Wed</span>
                    <span className="text-sm font-black block mt-0.5">28</span>
                  </button>
                </div>

                {/* Feb 29 (Tomorrow) */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-transparent uppercase font-black select-none">•</span>
                  <button 
                    onClick={() => setSelectedDay("Feb 29")}
                    className={`h-14 w-12 rounded-2xl flex flex-col justify-center items-center transition-all cursor-pointer font-sans text-xs ${
                      selectedDay === "Feb 29"
                        ? "bg-[#009BF5] text-white font-extrabold shadow-md shadow-blue-500/10"
                        : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-850"
                    }`}
                  >
                    <span className="text-[9px] block opacity-80 uppercase font-bold">Tomorrow</span>
                    <span className="text-[10px] block opacity-90 leading-none">Thu</span>
                    <span className="text-sm font-black block mt-0.5">29</span>
                  </button>
                </div>

                {/* Mar 01 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-black tracking-wider">March</span>
                  <button 
                    onClick={() => setSelectedDay("Mar 01")}
                    className={`h-14 w-12 rounded-2xl flex flex-col justify-center items-center transition-all cursor-pointer font-sans text-xs ${
                      selectedDay === "Mar 01"
                        ? "bg-[#009BF5] text-white font-extrabold shadow-md shadow-blue-500/10"
                        : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-850"
                    }`}
                  >
                    <span className="text-[9px] block opacity-0 uppercase select-none">•</span>
                    <span className="text-[10px] block opacity-90 leading-none">Fri</span>
                    <span className="text-sm font-black block mt-0.5">01</span>
                  </button>
                </div>

                {/* Mar 02 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-transparent uppercase font-black select-none">•</span>
                  <button 
                    onClick={() => setSelectedDay("Mar 02")}
                    className={`h-14 w-12 rounded-2xl flex flex-col justify-center items-center transition-all cursor-pointer font-sans text-xs ${
                      selectedDay === "Mar 02"
                        ? "bg-[#009BF5] text-white font-extrabold shadow-md shadow-blue-500/10"
                        : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-850"
                    }`}
                  >
                    <span className="text-[10px] block opacity-90 leading-none">Sat</span>
                    <span className="text-sm font-black block mt-0.5">02</span>
                  </button>
                </div>

                {/* More Days Button */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[9px] font-mono text-transparent uppercase select-none">•</span>
                  <button className="h-14 w-10 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-slate-200 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors">
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>

              </div>
            </div>

            {/* Vertical timeline classes list */}
            <div className="relative pl-4 border-l border-dashed border-slate-200 dark:border-slate-800 space-y-4 flex-1">
              
              {activeEvents.map((item, index) => {
                const isBreak = item.type === "break";
                
                return (
                  <div key={item.id} className="relative">
                    {/* Circle Dot indicator on the left line */}
                    <span className="absolute -left-[20px] top-4 h-3 w-3 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-sm" />

                    <div className="grid grid-cols-12 gap-3 items-center">
                      {/* Left time label (3 cols) */}
                      <div className="col-span-3 text-[9px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase leading-snug">
                        {item.time.split(" ")[0]} <br />
                        <span className="text-[8px] font-medium opacity-70">{item.time.split(" ").slice(1).join(" ")}</span>
                      </div>

                      {/* Right card container (9 cols) */}
                      <div className="col-span-9">
                        {isBreak ? (
                          <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-850 rounded-2xl flex items-center gap-3">
                            <div className={`${item.iconColor} p-2 rounded-xl text-xs shrink-0 font-bold uppercase`}>
                              ☕
                            </div>
                            <div>
                              <h5 className="font-extrabold text-xs text-slate-700 dark:text-slate-300">
                                {item.title}
                              </h5>
                              <p className="text-[9px] text-slate-400 font-mono mt-0.5">{item.room}</p>
                            </div>
                          </div>
                        ) : (
                          <div 
                            onClick={() => setSelectedEvent(item)}
                            className="bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850 flex items-center justify-between gap-2.5 transition-all cursor-pointer group text-left shadow-sm"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`${item.iconColor} p-2 rounded-xl shrink-0 font-bold text-xs shadow-sm`}>
                                {item.type === "religion" ? "✝" : item.type === "math" ? "🔢" : item.type === "history" ? "📜" : item.type === "tech" ? "🤖" : item.type === "exam" ? "✍" : "📖"}
                              </div>
                              <div className="min-w-0">
                                <h5 className="font-extrabold text-xs text-slate-900 dark:text-white truncate group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                  {item.title}
                                </h5>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-mono mt-0.5">
                                  {item.room}
                                </p>
                              </div>
                            </div>
                            <MoreHorizontal className="h-4 w-4 text-slate-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {activeEvents.length === 0 && (
                <div className="text-center py-12 text-xs text-slate-400 dark:text-slate-500 font-mono">
                  No classes scheduled for this day.
                </div>
              )}

            </div>

            {/* Quick static disclaimer */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl text-[10px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-850">
              <Info className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span>Gemma automatically updates the school schedule based on the official school bulletin.</span>
            </div>

          </div>

        </div>

        {/* ==============================================
            COLUMN 3: "Lo nuevo" News Feed (col-span-4)
            ============================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 p-6 rounded-[32px] shadow-sm text-left flex flex-col gap-6 min-h-[610px]">
            
            {/* Title & Settings Icon */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-sans flex items-center gap-2">
                What's New
              </h3>
              <button 
                onClick={() => onNavigate("settings")}
                className="h-7 w-7 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 text-slate-600 dark:text-slate-400 rounded-full transition-colors cursor-pointer"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Buttons Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none select-none">
              {["All", "Announcement", "Service", "Wallet", "Grade"].map((category) => (
                <button
                  key={category}
                  onClick={() => setNewsFilter(category)}
                  className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-mono font-bold shrink-0 transition-all cursor-pointer ${
                    newsFilter === category 
                      ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* List Feed cards */}
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[420px] scrollbar-none">
              
              {filteredFeedItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-slate-50 dark:bg-slate-950/40 border p-4.5 rounded-3xl text-left space-y-3 shadow-sm hover:shadow transition-all relative ${
                    item.isUnread 
                      ? "border-blue-500/20 dark:border-blue-500/10 bg-blue-500/[0.01]" 
                      : "border-slate-100 dark:border-slate-850"
                  }`}
                >
                  {/* Top card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-inner">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                          {item.title}
                        </h4>
                        <span className={`inline-block text-[8px] font-mono font-black uppercase tracking-wider border px-1.5 py-0.5 rounded mt-1 ${item.badgeColor}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 font-medium shrink-0">
                      <span>{item.timeLabel}</span>
                      {item.isUnread && (
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Feed description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Actions depending on types */}
                  {item.actionType === "matricula" && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-850/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        Recommended Room: Kinder A
                      </span>
                      <button 
                        onClick={() => setIsMatriculado(!isMatriculado)}
                        className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wide cursor-pointer transition-colors ${
                          isMatriculado 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                            : "bg-white dark:bg-slate-900 text-[#009BF5] dark:text-blue-400 hover:text-white hover:bg-[#009BF5] border border-[#009BF5]/30"
                        }`}
                      >
                        {isMatriculado ? "Enrolled ✓" : "Pre-Enroll"}
                      </button>
                    </div>
                  )}

                  {item.actionType === "pago" && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-850/60 flex items-center justify-between">
                      <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
                        {item.amount}
                      </span>
                      <button 
                        onClick={() => setIsPaid(!isPaid)}
                        className={`px-4.5 py-1.5 rounded-xl text-[10px] font-bold font-sans uppercase tracking-wide cursor-pointer transition-all ${
                          isPaid 
                            ? "bg-emerald-500 text-white shadow-sm" 
                            : "bg-[#009BF5] hover:bg-blue-600 text-white shadow shadow-blue-400/20"
                        }`}
                      >
                        {isPaid ? "Paid ✓" : "Pay"}
                      </button>
                    </div>
                  )}

                </div>
              ))}

              {filteredFeedItems.length === 0 && (
                <div className="text-center py-12 text-xs text-slate-400 dark:text-slate-500 font-mono">
                  No notifications in this category.
                </div>
              )}

            </div>

            {/* Quick interactive checklist block */}
            <div className="border-t border-slate-100 dark:border-slate-850 pt-4 space-y-3">
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-bold">Pending Tasks</span>
              
              <div className="space-y-2">
                {quickTasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150/60 dark:border-slate-850/80 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="truncate">{task}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveTask(i)}
                      className="text-slate-400 hover:text-red-500 p-0.5 cursor-pointer rounded transition-colors"
                      title="Delete task"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}

                {quickTasks.length === 0 && (
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono italic">Congratulations! You have no pending tasks.</p>
                )}

                <form onSubmit={handleAddTask} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="New task..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!newTaskText.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl disabled:opacity-40 transition-colors shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ==============================================
          FLOATING DETAIL MODAL ON CLICKING ANY TIMELINE EVENT
          ============================================== */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] max-w-md w-full p-6 text-left shadow-2xl relative space-y-4">
            
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 text-slate-500 hover:text-slate-800 rounded-full cursor-pointer transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`${selectedEvent.iconColor} p-3 rounded-2xl text-lg font-bold`}>
                {selectedEvent.type === "religion" ? "✝" : selectedEvent.type === "math" ? "🔢" : selectedEvent.type === "history" ? "📜" : selectedEvent.type === "tech" ? "🤖" : "📖"}
              </div>
              <div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
                  Event Details
                </span>
                <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                  {selectedEvent.title}
                </h4>
              </div>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-100 dark:border-slate-850 py-3 font-mono text-slate-500 dark:text-slate-400">
              <p className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Time: {selectedEvent.time}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>Location: {selectedEvent.room}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                <span>Group: Grade 12A - Cordillera School</span>
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block tracking-wider">Activity Description</span>
              <p className="font-sans">
                {selectedEvent.description || "This school activity is coordinated based on the teacher calendar of Cordillera School."}
              </p>
            </div>

            <button 
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Got it
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
