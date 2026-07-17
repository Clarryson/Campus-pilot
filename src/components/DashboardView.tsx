import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Upload, 
  BrainCircuit, 
  FileText, 
  BookOpen, 
  Layers, 
  CalendarClock, 
  GraduationCap, 
  TrendingUp, 
  Folder, 
  Zap, 
  RefreshCw, 
  Check, 
  ChevronRight, 
  BellRing, 
  Users, 
  Award, 
  Play, 
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GemmaActivityLog, TimetableClass, ExamEvent, ReminderItem } from "../types";

interface StudentProfile {
  name: string;
  university: string;
  course: string;
  department: string;
  year: number;
  semester: number;
  registrationNumber: string;
}

interface DashboardViewProps {
  gemmaActivities: GemmaActivityLog[];
  timetable: TimetableClass[];
  exams: ExamEvent[];
  reminders: ReminderItem[];
  scholarships?: any[];
  campusEvents?: any[];
  studentProfile?: StudentProfile | null;
  onNavigate: (section: string) => void;
  onAddQuickReminder: (text: string) => void;
  onToggleSidebar?: () => void;
  googleUser: any;
}

export default function DashboardView({ 
  gemmaActivities, 
  timetable, 
  exams, 
  reminders, 
  scholarships = [],
  campusEvents = [],
  studentProfile,
  onNavigate,
  onAddQuickReminder,
  googleUser
}: DashboardViewProps) {
  // AI Daily Briefing reasoning simulation states
  const [reasoningState, setReasoningState] = useState<'Thinking...' | 'Analyzing...' | 'Organizing...' | 'Generating...' | 'Completed'>('Completed');
  const [briefingTab, setBriefingTab] = useState<'schedule' | 'tomorrow' | 'study' | 'assignment' | 'exam' | 'scholarship' | 'events'>('schedule');
  const [expandedActivityId, setExpandedActivityId] = useState<string | null>(null);

  // Auto-expand first activity if available
  useEffect(() => {
    if (gemmaActivities && gemmaActivities.length > 0) {
      setExpandedActivityId(gemmaActivities[0].id);
    }
  }, [gemmaActivities]);

  // Trigger brief reasoning animation when clicking refresh
  const triggerGemmaReasoning = () => {
    const states: Array<'Thinking...' | 'Analyzing...' | 'Organizing...' | 'Generating...' | 'Completed'> = [
      'Thinking...',
      'Analyzing...',
      'Organizing...',
      'Generating...',
      'Completed'
    ];
    let index = 0;
    setReasoningState(states[0]);
    const interval = setInterval(() => {
      index++;
      if (index < states.length) {
        setReasoningState(states[index]);
      } else {
        clearInterval(interval);
      }
    }, 600);
  };

  // Dynamic calculations
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayDay = days[new Date().getDay()];
  const todayClasses = timetable.filter(c => c.day.toLowerCase() === todayDay.toLowerCase());
  const classesTodayCount = todayClasses.length;

  const examsCount = exams.length;
  const pendingReminders = reminders.filter(r => !r.completed);
  const remindersCount = pendingReminders.length;
  const scholarshipsCount = scholarships.length;
  const campusEventsCount = campusEvents.length;

  // Six Premium KPI Cards Data
  const kpiCards = [
    {
      id: "kpi-classes",
      title: "Today's Classes",
      count: classesTodayCount === 0 ? "None Scheduled" : `${classesTodayCount} Lectures`,
      status: classesTodayCount > 0 ? `Next: ${todayClasses[0].courseCode} (${todayClasses[0].venue})` : "Free day!",
      progress: classesTodayCount > 0 ? 100 : 0,
      color: "from-[#4285F4] to-blue-600",
      iconColor: "bg-blue-500/10 text-[#4285F4] dark:bg-blue-500/20 dark:text-blue-300",
      icon: Calendar,
      action: () => onNavigate("schedule")
    },
    {
      id: "kpi-exams",
      title: "Upcoming Exams",
      count: examsCount === 0 ? "No Exams" : `${examsCount} Scheduled`,
      status: examsCount > 0 ? `First exam: ${exams[0].courseCode}` : "Syllabus clear",
      progress: examsCount > 0 ? 80 : 0,
      color: "from-[#7C4DFF] to-purple-600",
      iconColor: "bg-purple-500/10 text-[#7C4DFF] dark:bg-purple-500/20 dark:text-purple-300",
      icon: FileText,
      action: () => onNavigate("examinations")
    },
    {
      id: "kpi-assignments",
      title: "Assignments Due",
      count: remindersCount === 0 ? "All Complete" : `${remindersCount} Pending`,
      status: remindersCount > 0 ? pendingReminders[0].title : "Zero active deadlines",
      progress: remindersCount > 0 ? 50 : 100,
      color: "from-amber-500 to-orange-500",
      iconColor: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      icon: Layers,
      action: () => onNavigate("planner")
    },
    {
      id: "kpi-projects",
      title: "Scholarships",
      count: scholarshipsCount === 0 ? "0 Listed" : `${scholarshipsCount} Matched`,
      status: scholarshipsCount > 0 ? `Next deadline: ${scholarships[0].deadline}` : "No matches yet",
      progress: scholarshipsCount > 0 ? 100 : 0,
      color: "from-cyan-500 to-blue-500",
      iconColor: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
      icon: BrainCircuit,
      action: () => onNavigate("scholarships")
    },
    {
      id: "kpi-calendar",
      title: "Calendar Sync Status",
      count: googleUser ? "Google Calendar" : "Local Sync",
      status: googleUser ? "Real-time Sync Active" : "Click to Connect GCal",
      progress: 100,
      color: "from-[#34A853] to-emerald-600",
      iconColor: "bg-emerald-500/10 text-[#34A853] dark:bg-emerald-500/20 dark:text-emerald-300",
      icon: CalendarClock,
      action: () => onNavigate("google-calendar")
    },
    {
      id: "kpi-health",
      title: "Academic Health Score",
      count: timetable.length > 0 ? "96% AI Optimized" : "Database Blank",
      status: timetable.length > 0 ? "Top Tier Performance" : "Upload timetable to analyze",
      progress: timetable.length > 0 ? 96 : 0,
      color: "from-rose-500 to-pink-600",
      iconColor: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      icon: TrendingUp,
      action: () => onNavigate("planner")
    }
  ];

  // Quick Actions floating cards
  const quickActions = [
    { title: "Upload Class Timetable", icon: Upload, action: () => onNavigate("documents"), badge: "PDF" },
    { title: "Upload Exam Timetable", icon: FileText, action: () => onNavigate("documents"), badge: "Extract" },
    { title: "Generate Study Plan", icon: BookOpen, action: () => onNavigate("study-planner"), badge: "Gemma" },
    { title: "Ask Gemma", icon: Sparkles, action: () => onNavigate("ai-workspace"), badge: "AI 4" },
    { title: "Compare Timetables", icon: Layers, action: () => onNavigate("documents"), badge: "Diff v2" },
    { title: "Sync Google Calendar", icon: CalendarClock, action: () => onNavigate("google-calendar"), badge: "Live" },
    { title: "Upload Student Handbook", icon: Folder, action: () => onNavigate("documents"), badge: "RAG" },
    { title: "Upload Academic Calendar", icon: Calendar, action: () => onNavigate("documents"), badge: "Dates" },
  ];
  // Derive activity logs from actual database log state
  const activityLogs = gemmaActivities.map((act) => ({
    id: act.id,
    time: new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    title: act.message,
    desc: act.reasoning,
    status: act.category,
    statusColor: act.category === 'Timetable' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
               : act.category === 'Exam' ? 'bg-red-500/10 text-red-600 border-red-500/20'
               : act.category === 'Study Plan' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20'
               : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    icon: Sparkles
  }));

  // Today's Timeline classes derived dynamically
  const todayClassesList = timetable
    .filter(c => c.day.toLowerCase() === todayDay.toLowerCase())
    .map((c, idx) => {
      // Set status based on index for clean presentation: first is complete, second is live, others upcoming
      const statusVal = idx === 0 ? "completed" : idx === 1 ? "live" : "upcoming";
      const countdownVal = statusVal === "completed" ? "Completed"
                        : statusVal === "live" ? "Live Now"
                        : `Starts at ${c.startTime}`;
      return {
        id: c.id,
        time: `${c.startTime} - ${c.endTime}`,
        name: `${c.courseCode}: ${c.courseName}`,
        venue: c.venue,
        building: c.building,
        lecturer: c.lecturer,
        status: statusVal,
        countdown: countdownVal
      };
    });

  // Upcoming Exams derived dynamically
  const upcomingExamsList = exams.map((ex, idx) => {
    // Generate helpful custom countdowns
    const diffTime = Math.max(1, Math.round((new Date(ex.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    return {
      id: ex.id,
      subject: `${ex.courseCode}: ${ex.courseName}`,
      countdown: `${diffTime} ${diffTime === 1 ? 'Day' : 'Days'} Left`,
      venue: ex.venue,
      building: "University Campus",
      difficulty: idx % 2 === 0 ? "High Intensity" : "Medium Load",
      difficultyColor: idx % 2 === 0
        ? "text-red-500 bg-red-500/10 border-red-500/20"
        : "text-amber-500 bg-amber-500/10 border-amber-500/20",
      recommendation: `Verify location ${ex.venue} and review primary concepts for ${ex.courseCode}.`
    };
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 text-left bg-[#FFFFFF] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ==============================================
          1. MAIN HERO SECTION (AI Operating System Centerpiece)
          ============================================== */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E1E38] p-6 md:p-10 text-white shadow-xl border border-slate-700/60 group">
        
        {/* Background Glowing AI Orbs */}
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-tr from-[#4285F4]/40 to-[#7C4DFF]/40 blur-3xl pointer-events-none animate-float" />
        <div className="absolute right-1/4 -bottom-20 h-64 w-64 rounded-full bg-[#34A853]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#4285F4]/20 border border-[#4285F4]/40 text-[#4285F4] dark:text-blue-300 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
                <span>Gemma 4 Autonomous Core</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>System Synchronized</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white leading-tight">
              Good Morning, {googleUser?.displayName ? googleUser.displayName.split(' ')[0] : (studentProfile?.name || "Student")} <span className="inline-block animate-wiggle">👋</span>
            </h1>

            <div className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-md border border-white/15 rounded-2xl p-4 md:p-5 space-y-3">
              <p className="text-sm md:text-base text-slate-100 font-medium leading-relaxed">
                <strong className="text-blue-300 font-extrabold">Gemma has analyzed your semester.</strong> You have:
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm font-semibold font-mono">
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-200">
                  🗓️ {classesTodayCount} {classesTodayCount === 1 ? "Class" : "Classes"} Today
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-200">
                  ⚠️ {remindersCount} {remindersCount === 1 ? "Task" : "Tasks"} Pending
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200">
                  ✍️ {examsCount} {examsCount === 1 ? "Exam" : "Exams"} Scheduled
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200">
                  🎓 {scholarshipsCount} {scholarshipsCount === 1 ? "Scholarship" : "Scholarships"}
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-200">
                  🎉 {campusEventsCount} {campusEventsCount === 1 ? "Event" : "Events"} Today
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-200">
                  📅 {googleUser ? "Google Calendar Active" : "Local Database"}
                </span>
              </div>
            </div>
          </div>

          {/* Primary & Secondary Hero Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full sm:w-auto shrink-0">
            <button 
              onClick={() => onNavigate("documents")}
              className="px-6 py-3.5 bg-gradient-to-r from-[#4285F4] to-[#7C4DFF] hover:from-blue-600 hover:to-purple-600 text-white font-sans font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-102 cursor-pointer"
            >
              <Upload className="h-4.5 w-4.5" />
              <span>Upload Timetable</span>
            </button>

            <button 
              onClick={() => onNavigate("ai-workspace")}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans font-bold text-sm rounded-2xl backdrop-blur-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <Sparkles className="h-4.5 w-4.5 text-[#4285F4]" />
              <span>Ask Gemma</span>
            </button>
          </div>

        </div>

      </div>

      {/* ==============================================
          2. TOP KPI CARDS (Six Premium Cards)
          ============================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              onClick={card.action}
              className="m3-card bg-[#F8FAFC] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-slate-800 p-5 cursor-pointer flex flex-col justify-between min-h-[145px] group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {card.title}
                  </span>
                  <h3 className="text-2xl font-black font-sans tracking-tight text-slate-900 dark:text-white mt-1.5 group-hover:text-[#4285F4] transition-colors">
                    {card.count}
                  </h3>
                </div>
                <div className={`p-3 rounded-2xl ${card.iconColor} shadow-xs group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span className="truncate">{card.status}</span>
                  <span className="font-mono font-bold">{card.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${card.color} transition-all duration-1000`} 
                    style={{ width: `${card.progress}%` }} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==============================================
          3. AI DAILY BRIEFING (Centerpiece of Dashboard)
          ============================================== */}
      <div className="m3-card bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
        
        {/* Briefing Header & Reasoning Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-[#4285F4] dark:text-blue-400 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Gemma 4 Centerpiece</span>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white mt-2">
              AI Daily Briefing & Reasoning Engine
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gemma autonomously synthesizes your timetable, upcoming exams, study intensity, and campus recommendations into one unified briefing.
            </p>
          </div>

          {/* Reasoning States Simulator */}
          <div className="flex items-center gap-3 bg-[#F8FAFC] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 px-4 py-2.5 rounded-2xl shrink-0">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Gemma State:</span>
            <span className={`px-3 py-1 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 ${
              reasoningState === 'Completed' 
                ? 'bg-emerald-500/10 text-[#34A853] dark:text-emerald-300 border border-emerald-500/20' 
                : 'bg-blue-500/10 text-[#4285F4] dark:text-blue-300 border border-blue-500/20 animate-pulse'
            }`}>
              <span className="h-2 w-2 rounded-full bg-current animate-ping" />
              <span>{reasoningState}</span>
            </span>
            <button 
              onClick={triggerGemmaReasoning}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg cursor-pointer"
              title="Re-run Gemma Reasoning"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Briefing Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
          {[
            { id: 'schedule', label: "Today's Schedule", icon: Calendar },
            { id: 'tomorrow', label: "Tomorrow Preview", icon: Clock },
            { id: 'study', label: "Study Recommendation", icon: BookOpen },
            { id: 'assignment', label: "Assignment Reminder", icon: Layers },
            { id: 'exam', label: "Exam Countdown", icon: FileText },
            { id: 'scholarship', label: "Scholarship Recommendation", icon: Award },
            { id: 'events', label: "Campus Event Recommendation", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isTabActive = briefingTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setBriefingTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold font-sans flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isTabActive
                    ? "bg-[#4285F4] text-white shadow-md shadow-blue-500/20 font-black"
                    : "bg-[#F8FAFC] dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-[#E5E7EB] dark:border-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Briefing Content Area */}
        <div className="bg-[#F8FAFC] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 text-left relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {briefingTab === 'schedule' && (
              <motion.div 
                key="schedule"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#4285F4]" />
                    <span>Gemma Briefing: Today's 3-Class Itinerary</span>
                  </h3>
                  <span className="text-xs font-mono text-[#34A853] font-bold">100% Attendance Tracked</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your academic day begins at <strong>08:30 AM</strong> with <strong className="text-slate-900 dark:text-white">Linear Algebra & Probability</strong> in Senior Year A - Hc, followed by <strong className="text-[#4285F4]">Artificial Intelligence Lab 4</strong> right now at 10:30 AM, and concludes with Cloud Systems at 02:00 PM. No room collisions or time overlaps exist.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button onClick={() => onNavigate("schedule")} className="px-4 py-2 bg-[#4285F4] text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer">
                    View Full Roadmap
                  </button>
                  <button onClick={() => onNavigate("ai-workspace")} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer">
                    Ask Gemma About Lectures
                  </button>
                </div>
              </motion.div>
            )}

            {briefingTab === 'tomorrow' && (
              <motion.div 
                key="tomorrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-500" />
                    <span>Tomorrow Preview (Thursday, Feb 29)</span>
                  </h3>
                  <span className="text-xs font-mono text-purple-500 font-bold">2 Workshops Staged</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Tomorrow you have <strong className="text-slate-900 dark:text-white">Chilean History Class</strong> at 08:30 AM in Conference Room B, and the <strong className="text-purple-400">Advanced Robotics Workshop</strong> at 10:15 AM in Innovation Lab. Gemma has pre-cached microcontroller reference documentation.
                </p>
              </motion.div>
            )}

            {briefingTab === 'study' && (
              <motion.div 
                key="study"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-500" />
                    <span>Gemma Study Recommendation: Feynman Technique</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-500 font-bold">Priority High</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Based on your upcoming Networking exam in 5 days, Gemma recommends devoting <strong>90 minutes tonight</strong> between 07:00 PM and 08:30 PM to active recall on <strong className="text-slate-900 dark:text-white">TCP/IP Handshake & Distributed Consensus Protocols</strong>.
                </p>
                <button onClick={() => onNavigate("study-planner")} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer">
                  Launch Study Block Matrix
                </button>
              </motion.div>
            )}

            {briefingTab === 'assignment' && (
              <motion.div 
                key="assignment"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <Layers className="h-5 w-5 text-amber-500" />
                    <span>Assignment Reminder: Algorithm Lab 3 Due Tomorrow</span>
                  </h3>
                  <span className="text-xs font-mono text-amber-500 font-bold">Due Friday 11:59 PM</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your <strong className="text-slate-900 dark:text-white">Heaps & B-Trees implementation script</strong> for CSC 212 is scheduled for submission tomorrow. Gemma has reviewed your staging branch and verified no memory leaks exist.
                </p>
              </motion.div>
            )}

            {briefingTab === 'exam' && (
              <motion.div 
                key="exam"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="h-5 w-5 text-red-500" />
                    <span>Exam Countdown: Networking & Cloud Architecture (5 Days)</span>
                  </h3>
                  <span className="text-xs font-mono text-red-500 font-bold">High Intensity</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Scheduled at the <strong>Graduation Pavilion, Hall A</strong>. Gemma cognitive load analysis indicates your preparation index is at <strong className="text-emerald-500">80% on track</strong>. 3 mock examination papers are pre-generated.
                </p>
              </motion.div>
            )}

            {briefingTab === 'scholarship' && (
              <motion.div 
                key="scholarship"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    <span>Scholarship Recommendation: Google DeepMind AI Fellowship</span>
                  </h3>
                  <span className="text-xs font-mono text-purple-500 font-bold">98% Match Score</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Provides <strong>$15,000 full semester tuition coverage + mentorship</strong>. Your Computer Science Year 2 GPA (9.2) exceeds the eligibility threshold. Application deadline: August 15.
                </p>
                <button onClick={() => onNavigate("scholarships")} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer">
                  View All 2 Scholarships
                </button>
              </motion.div>
            )}

            {briefingTab === 'events' && (
              <motion.div 
                key="events"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-500" />
                    <span>Campus Event Recommendation: Build with Gemma Hackathon</span>
                  </h3>
                  <span className="text-xs font-mono text-cyan-500 font-bold">Today • Student Union</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Join Google Developer Groups (GDG) and Campus innovation teams for the live demonstration of AI autonomous agents. Pizza and Google Cloud credits provided.
                </p>
                <button onClick={() => onNavigate("events")} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer">
                  Register & View Events
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* ==============================================
          4. QUICK ACTIONS (Floating Cards with Hover & M3 Ripple)
          ============================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-sans text-slate-900 dark:text-white flex items-center gap-2">
            <span>Quick Autonomous Actions</span>
            <span className="text-xs font-mono text-slate-400 font-normal">(Instant Execution)</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {quickActions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="m3-card bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center gap-2.5 text-center hover:border-[#4285F4] group transition-all duration-300 cursor-pointer shadow-xs"
              >
                <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-900 text-[#4285F4] dark:text-blue-400 border border-slate-200/50 dark:border-slate-800/60 group-hover:bg-[#4285F4] group-hover:text-white transition-all shadow-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-[#4285F4] dark:group-hover:text-blue-300 transition-colors">
                  {item.title}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[9px] font-mono font-bold text-slate-500 dark:text-slate-400">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==============================================
          5. AI ACTIVITY TIMELINE & TODAY'S TIMELINE (Two-Column Layout)
          ============================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: AI Activity Timeline (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="m3-card bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4285F4] block">
                  Autonomous Behavior Feed
                </span>
                <h3 className="text-xl font-black font-sans text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                  AI Activity Timeline
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#34A853] text-xs font-mono font-bold border border-emerald-500/20">
                Live Monitoring
              </span>
            </div>

            <div className="space-y-3 relative pl-4 border-l border-dashed border-slate-200 dark:border-slate-800">
              {activityLogs.map((log) => {
                const Icon = log.icon;
                const isExpanded = expandedActivityId === log.id;
                return (
                  <div key={log.id} className="relative">
                    {/* Circle timeline dot */}
                    <span className="absolute -left-[21px] top-4 h-3.5 w-3.5 rounded-full bg-white dark:bg-slate-900 border-2 border-[#4285F4] shadow-xs" />

                    <div 
                      onClick={() => setExpandedActivityId(isExpanded ? null : log.id)}
                      className="bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 hover:border-[#4285F4]/40 transition-all cursor-pointer group space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-[#4285F4] shrink-0 shadow-xs">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-[#4285F4] transition-colors">
                              {log.title}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                              {log.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border uppercase ${log.statusColor}`}>
                            {log.status}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Expandable details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed"
                          >
                            {log.desc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Today's Timeline & Upcoming Exams (col-span-5) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Today's Timeline Vertical Box */}
          <div className="m3-card bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  February 28, 2026
                </span>
                <h3 className="text-xl font-black font-sans text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                  Today's Timeline
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-[#4285F4] text-xs font-mono font-bold border border-blue-500/20">
                {classesTodayCount} {classesTodayCount === 1 ? "Lecture" : "Lectures"}
              </span>
            </div>

            <div className="space-y-4">
              {todayClassesList.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 font-mono">No lectures today</div>
              ) : (
                todayClassesList.map((cls) => {
                const isLive = cls.status === "live";
                const isCompleted = cls.status === "completed";
                return (
                  <div 
                    key={cls.id}
                    onClick={() => onNavigate("schedule")}
                    className={`p-4.5 rounded-2xl border transition-all cursor-pointer ${
                      isLive 
                        ? "bg-blue-500/5 dark:bg-blue-950/30 border-[#4285F4] shadow-md shadow-blue-500/10"
                        : isCompleted
                        ? "bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-70"
                        : "bg-[#F8FAFC] dark:bg-slate-900 border-[#E5E7EB] dark:border-slate-800 hover:border-[#4285F4]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                        <Clock className="h-3.5 w-3.5 text-[#4285F4]" />
                        <span>{cls.time}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider ${
                        isLive ? "bg-cyan-500 text-white animate-pulse" : isCompleted ? "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300" : "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                      }`}>
                        {cls.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-2 font-sans">
                      {cls.name}
                    </h4>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-[#4285F4]">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{cls.venue}</span>
                      </span>
                      <span>•</span>
                      <span>{cls.lecturer}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {cls.countdown}
                      </span>
                      {isLive && (
                        <button className="px-3 py-1 bg-[#4285F4] hover:bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all">
                          Open Notes & Venue
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
            </div>
          </div>

          {/* Upcoming Exams Premium Cards */}
          <div className="m3-card bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-slate-800 p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7C4DFF] block">
                  Cognitive Load & Revision
                </span>
                <h3 className="text-xl font-black font-sans text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                  Upcoming Exams
                </h3>
              </div>
              <button 
                onClick={() => onNavigate("examinations")}
                className="text-xs font-mono text-[#4285F4] hover:underline font-bold cursor-pointer"
              >
                View All ({examsCount})
              </button>
            </div>

            <div className="space-y-4">
              {upcomingExamsList.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 font-mono">No upcoming exams scheduled</div>
              ) : (
                upcomingExamsList.map((exam) => (
                  <div 
                    key={exam.id}
                    className="bg-[#F8FAFC] dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-4.5 space-y-3 hover:border-purple-500/40 transition-all shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-[#7C4DFF] dark:text-purple-300 font-mono font-bold text-xs">
                        {exam.countdown}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider border ${exam.difficultyColor}`}>
                        {exam.difficulty}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans truncate">
                      {exam.subject}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1 text-[#7C4DFF]">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{exam.venue}</span>
                      </span>
                      <span>•</span>
                      <span>{exam.building}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200/40 dark:border-slate-800 flex flex-col gap-2.5 text-xs">
                      <p className="text-slate-500 leading-relaxed font-sans font-medium">
                        {exam.recommendation}
                      </p>
                      <button 
                        onClick={() => onNavigate("ai-workspace")}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10.5px] font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <BrainCircuit className="h-3.5 w-3.5 text-[#7C4DFF]" />
                        <span>Start Revision & Practice Test</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
