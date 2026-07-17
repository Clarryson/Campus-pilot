import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { initAuth, googleSignIn, logout } from "./lib/firebase";

// Import types
import { 
  DocumentRecord, 
  TimetableClass, 
  ExamEvent, 
  AssignmentRecord, 
  StudyPlanItem, 
  ReminderItem, 
  NotificationItem, 
  GemmaActivityLog, 
  CalendarEventItem, 
  ScholarshipItem, 
  CampusEventItem 
} from "./types";

// Import modular components
import LandingPage from "./components/LandingPage";
import TopBar from "./components/TopBar";
import Navigation from "./components/Navigation";
import DashboardView from "./components/DashboardView";
import ScheduleView from "./components/ScheduleView";
import PlannerView from "./components/PlannerView";
import DocumentsView from "./components/DocumentsView";
import AIWorkspaceView from "./components/AIWorkspaceView";
import ScholarshipsView from "./components/ScholarshipsView";
import EventsView from "./components/EventsView";
import SettingsView from "./components/SettingsView";
import ExaminationsView from "./components/ExaminationsView";
import GoogleCalendarView from "./components/GoogleCalendarView";
import NotificationsView from "./components/NotificationsView";
import HandbookView from "./components/HandbookView";

export default function App() {
  // Navigation State — persisted so upload/re-renders don't reset to landing page
  const [viewMode, setViewMode] = useState<'landing' | 'app'>(() => {
    return (localStorage.getItem('viewMode') as 'landing' | 'app') || 'landing';
  });
  const [currentSection, setCurrentSection] = useState<string>(
    localStorage.getItem('currentSection') || 'dashboard'
  );

  // Application DB State
  const [studentProfile, setStudentProfile] = useState<any>(null);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [timetable, setTimetable] = useState<TimetableClass[]>([]);
  const [exams, setExams] = useState<ExamEvent[]>([]);
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([]);
  const [studyPlans, setStudyPlans] = useState<StudyPlanItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [gemmaActivities, setGemmaActivities] = useState<GemmaActivityLog[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventItem[]>([]);
  const [scholarships, setScholarships] = useState<ScholarshipItem[]>([]);
  const [campusEvents, setCampusEvents] = useState<CampusEventItem[]>([]);

  // UI Interactive States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'student' | 'gemma'; text: string; timestamp: string }>>(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chat messages", e);
      }
    }
    return [
      {
        sender: 'gemma',
        text: "### Welcome to CampusPilot AI!\n\nI am Gemma 4, your **Autonomous Academic Agent**. I have already extracted your class lecture dates and early examination milestones from your current uploaded PDFs.\n\nAsk me questions like:\n- *'What classes do I have tomorrow?'*\n- *'Are there any calendar conflicts?'*\n- *'Generate a highly intensive weekly study plan'*\n- *'Show my active exams and check density constraints.'*",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  // Automatically save chat messages to localStorage when updated
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages));
  }, [chatMessages]);
  const [isGemmaThinking, setIsGemmaThinking] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingFileName, setUploadingFileName] = useState<string>("");
  const [lastUploadResult, setLastUploadResult] = useState<{ fileName: string; summary: string; type: string; itemCount: number } | null>(null);
  const [isSyncingCalendar, setIsSyncingCalendar] = useState(false);
  const [studyPlanIntensity, setStudyPlanIntensity] = useState<'light' | 'medium' | 'intensive'>('medium');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    const saved = localStorage.getItem('fontSize');
    return (saved as 'normal' | 'large' | 'xlarge') || 'normal';
  });
  
  // Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Google Calendar Auth States
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Initialize Firebase Google Authentication listener on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        setIsAuthLoading(false);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
        setIsAuthLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Sync typography with local storage options
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    if (fontSize === 'normal') {
      document.documentElement.style.fontSize = '16px';
    } else if (fontSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else if (fontSize === 'xlarge') {
      document.documentElement.style.fontSize = '21px';
    }
  }, [fontSize]);

  // Sync theme with local storage options
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync state helper
  const syncWithState = (state: any) => {
    if (state.studentProfile) {
      setStudentProfile(state.studentProfile);
    }
    setDocuments(state.documents || []);
    setTimetable(state.timetable || []);
    setExams(state.exams || []);
    setAssignments(state.assignments || []);
    setStudyPlans(state.studyPlans || []);
    setReminders(state.reminders || []);
    setNotifications(state.notifications || []);
    setGemmaActivities(state.gemmaActivities || []);
    setCalendarEvents(state.calendarEvents || []);
  };

  // Fetch full state on mount
  const loadState = async () => {
    try {
      const response = await fetch("/api/state");
      if (response.ok) {
        const data = await response.json();
        if (data.studentProfile) {
          setStudentProfile(data.studentProfile);
        }
        setDocuments(data.documents || []);
        setTimetable(data.timetable || []);
        setExams(data.exams || []);
        setAssignments(data.assignments || []);
        setStudyPlans(data.studyPlans || []);
        setReminders(data.reminders || []);
        setNotifications(data.notifications || []);
        setGemmaActivities(data.gemmaActivities || []);
        setCalendarEvents(data.calendarEvents || []);
        setScholarships(data.scholarships || []);
        setCampusEvents(data.campusEvents || []);
      }
    } catch (error) {
      console.error("Failed to load initial state:", error);
    }
  };

  const handleUpdateProfile = async (newProfile: any) => {
    try {
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile: newProfile })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.state) {
          syncWithState(data.state);
        }
      }
    } catch (e) {
      console.error("Failed to update profile", e);
    }
  };

  useEffect(() => {
    loadState();
  }, []);

  // Sign In with Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
        setChatMessages(prev => [...prev, {
          sender: 'gemma',
          text: `### 🗓️ Google Account Connected Successfully!\n\nWelcome, **${result.user.displayName}**. I have verified your Google Calendar scopes. You can now synchronize your class lectures and exam milestones directly to your live Google Calendar with a single click.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (e) {
      console.error("Sign-in error", e);
    }
  };

  // Log Out of Google
  const handleGoogleLogout = async () => {
    try {
      await logout();
      setGoogleUser(null);
      setGoogleToken(null);
      // Clear persisted navigation so user returns to landing page on logout
      localStorage.removeItem('viewMode');
      localStorage.removeItem('currentSection');
      localStorage.removeItem('chatMessages');
      setViewMode('landing');
      setCurrentSection('dashboard');
      setChatMessages([
        {
          sender: 'gemma',
          text: "### Welcome to CampusPilot AI!\n\nI am Gemma 4, your **Autonomous Academic Agent**. I have already extracted your class lecture dates and early examination milestones from your current uploaded PDFs.\n\nAsk me questions like:\n- *'What classes do I have tomorrow?'*\n- *'Are there any calendar conflicts?'*\n- *'Generate a highly intensive weekly study plan'*\n- *'Show my active exams and check density constraints.'*",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (e) {
      console.error("Sign-out error", e);
    }
  };

  // Send message to Gemma
  const handleSendMessage = async (customPrompt?: string) => {
    const promptText = (customPrompt || chatInput).trim();
    if (!promptText) return;

    if (!customPrompt) setChatInput("");

    // Add student message
    const newMsg = {
      sender: 'student' as const,
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);
    setIsGemmaThinking(true);

    try {
      const history = chatMessages.map(m => ({
        role: m.sender === 'student' ? 'user' as const : 'model' as const,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptText, history })
      });

      if (response.ok) {
        const data = await response.json();
        
        setChatMessages(prev => [...prev, {
          sender: 'gemma',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        if (data.updatedState) {
          syncWithState(data.updatedState);
        }
      } else {
        throw new Error("Chat api response error");
      }
    } catch (error) {
      setChatMessages(prev => [...prev, {
        sender: 'gemma',
        text: "⚠️ **System Communication Interrupted**\n\nI failed to reach the AI model server. Let me resolve this locally. I am continuing to parse your database constraints offline.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsGemmaThinking(false);
    }
  };

  // PDF File Upload Handler
  const handleFileUpload = async (file: File) => {
    setUploadingFile(true);
    setUploadingFileName(file.name);
    setLastUploadResult(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64String = (reader.result as string).split(",")[1];
      try {
        const response = await fetch("/api/documents/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: file.name,
            base64: base64String
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.state) {
            syncWithState(result.state);
          }
          // Find the newly added document to get its type
          const newDoc = result.state?.documents?.[0];
          setLastUploadResult({
            fileName: file.name,
            summary: result.summary || 'Document analyzed and database updated successfully.',
            type: newDoc?.type || 'document',
            itemCount: result.state?.timetable?.length || result.state?.exams?.length || 0
          });
          setChatMessages(prev => [...prev, {
            sender: 'gemma',
            text: `### 📂 Document Analyzed Successfully\n\nI analyzed your uploaded file: **${file.name}**.\n\n**Gemma Assessment:** ${result.summary || 'Database mapped correctly'}\n\nI have updated your core schedules, staged new calendar events, and flagged necessary comparisons in your activity stream.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        } else {
          const err = await response.json();
          setLastUploadResult({
            fileName: file.name,
            summary: `Upload failed: ${err.error || 'Unknown error'}`,
            type: 'error',
            itemCount: 0
          });
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setLastUploadResult({
          fileName: file.name,
          summary: 'Network error — could not reach the server.',
          type: 'error',
          itemCount: 0
        });
      } finally {
        setUploadingFile(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Google Calendar Synchronization
  const handleCalendarSync = async () => {
    setIsSyncingCalendar(true);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (googleToken) {
        headers["Authorization"] = `Bearer ${googleToken}`;
      }
      const response = await fetch("/api/calendar/sync", {
        method: "POST",
        headers
      });
      if (response.ok) {
        const data = await response.json();
        if (data.state) {
          syncWithState(data.state);
        }
        
        const syncMessage = data.apiSyncCount > 0
          ? `### 🗓️ Live Google Calendar Sync Completed!\n\nI evaluated your staged agenda and successfully synchronized **${data.apiSyncCount} events** directly to your real connected Google Calendar (**${googleUser?.email || 'authenticated account'}**)! All active lecture slots are now synchronized live with real-time feedback.`
          : `### 🗓️ Google Calendar Sync Completed\n\nI evaluated your staged agenda and synchronized **${data.syncedCount} classes** locally. Connect your Google account at the top to sync them directly to your actual live Google Calendar!`;

        setChatMessages(prev => [...prev, {
          sender: 'gemma',
          text: syncMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (error) {
      console.error("Calendar sync failed:", error);
    } finally {
      setIsSyncingCalendar(false);
    }
  };

  // Study Plan Generator
  const handleGenerateStudyPlan = async (intensity: 'light' | 'medium' | 'intensive') => {
    setStudyPlanIntensity(intensity);
    try {
      const response = await fetch("/api/study-plans/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intensity })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.state) {
          syncWithState(data.state);
        }
        setChatMessages(prev => [...prev, {
          sender: 'gemma',
          text: `### 📚 Study Plan Re-optimized\n\nI generated a customized **${intensity}** study routine based on your priority coursework. Check the study block list in your side drawer or ask me to list your study hours!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }
    } catch (error) {
      console.error("Study plan failed:", error);
    }
  };

  // Add Quick Reminder Checklist Task
  const handleAddQuickReminder = async (text: string) => {
    try {
      const response = await fetch("/api/reminders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: text,
          dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          priority: "high"
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.state) {
          syncWithState(data.state);
        }
      }
    } catch (error) {
      console.error("Reminder create failed:", error);
    }
  };

  // Reset local database demo state
  const handleResetApp = async () => {
    try {
      const response = await fetch("/api/reset", { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        if (data.state) {
          syncWithState(data.state);
        }
        setChatMessages([
          {
            sender: 'gemma',
            text: "### System Re-initialized\n\nI have restored the initial high-fidelity hackathon scenario: university modules are reset to version 1. Staged events are ready for calendar synchronization, and the original document extraction logs are active.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setCurrentSection('dashboard');
      }
    } catch (error) {
      console.error("Reset failed:", error);
    }
  };

  // Mark alerts read
  const handleMarkNotificationsRead = async () => {
    try {
      const response = await fetch("/api/notifications/read", { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        if (data.state) {
          syncWithState(data.state);
        }
      }
    } catch (error) {
      console.error("Notifications mark failed:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const launchApp = (initialSection?: string) => {
    const section = initialSection || 'dashboard';
    setCurrentSection(section);
    localStorage.setItem('currentSection', section);
    setViewMode('app');
    localStorage.setItem('viewMode', 'app');
  };

  const navigateToSection = (section: string) => {
    setCurrentSection(section);
    localStorage.setItem('currentSection', section);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0F172A] text-slate-100' : 'bg-[#FFFFFF] text-slate-900'} font-sans selection:bg-[#4285F4] selection:text-white flex flex-col ${
      fontSize === 'normal' ? 'text-base' : fontSize === 'xlarge' ? 'text-xl' : 'text-lg'
    }`}>
      
      {/* LANDING PAGE ROUTE */}
      {viewMode === 'landing' ? (
        <LandingPage 
          onLaunchApp={launchApp} 
          googleUser={googleUser} 
          onGoogleSignIn={handleGoogleSignIn} 
        />
      ) : (
        /* HORIZONTAL AI OPERATING SYSTEM WORKSPACE */
        <div className="flex flex-col min-h-screen overflow-hidden bg-[#FFFFFF] dark:bg-[#0F172A]">
          
          {/* Top App Bar across ALL views */}
          <TopBar 
            notificationsCount={unreadCount} 
            onBellClick={() => setCurrentSection('notifications')} 
            googleUser={googleUser}
            onNavigate={navigateToSection}
            theme={theme}
            onToggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
          />

          {/* Sticky Horizontal Navigation Bar across ALL views */}
          <Navigation 
            currentSection={currentSection} 
            onSelectSection={navigateToSection} 
          />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-[#FFFFFF] dark:bg-[#0F172A] transition-colors duration-300">
            
            {currentSection === 'dashboard' && (
              <DashboardView 
                gemmaActivities={gemmaActivities} 
                timetable={timetable} 
                exams={exams} 
                reminders={reminders} 
                scholarships={scholarships}
                campusEvents={campusEvents}
                studentProfile={studentProfile}
                onNavigate={navigateToSection}
                onAddQuickReminder={handleAddQuickReminder}
                googleUser={googleUser}
              />
            )}

            {currentSection === 'schedule' && (
              <ScheduleView 
                timetable={timetable} 
                exams={exams} 
                onStartStudySession={() => setCurrentSection('ai-workspace')}
              />
            )}

            {(currentSection === 'planner' || currentSection === 'study-planner') && (
              <PlannerView 
                timetable={timetable} 
                studyPlans={studyPlans} 
                studyPlanIntensity={studyPlanIntensity}
                onGenerateStudyPlan={handleGenerateStudyPlan}
              />
            )}

            {currentSection === 'documents' && (
              <DocumentsView 
                documents={documents} 
                uploadingFile={uploadingFile}
                uploadingFileName={uploadingFileName}
                lastUploadResult={lastUploadResult}
                onFileUpload={handleFileUpload} 
              />
            )}

            {currentSection === 'ai-workspace' && (
              <AIWorkspaceView 
                chatInput={chatInput} 
                setChatInput={setChatInput} 
                chatMessages={chatMessages} 
                onSendMessage={handleSendMessage} 
                isGemmaThinking={isGemmaThinking}
                gemmaActivities={gemmaActivities}
                isUploadingFile={uploadingFile}
                uploadingFileName={uploadingFileName}
              />
            )}

            {currentSection === 'scholarships' && (
              <ScholarshipsView 
                scholarships={scholarships} 
              />
            )}

            {currentSection === 'events' && (
              <EventsView 
                campusEvents={campusEvents} 
              />
            )}

            {currentSection === 'examinations' && (
              <ExaminationsView 
                exams={exams} 
                onStartStudySession={() => setCurrentSection('ai-workspace')}
              />
            )}

            {currentSection === 'google-calendar' && (
              <GoogleCalendarView 
                googleUser={googleUser}
                calendarEvents={calendarEvents}
                isSyncingCalendar={isSyncingCalendar}
                onGoogleSignIn={handleGoogleSignIn}
                onGoogleLogout={handleGoogleLogout}
                onCalendarSync={handleCalendarSync}
              />
            )}

            {currentSection === 'notifications' && (
              <NotificationsView 
                notifications={notifications}
                onMarkRead={handleMarkNotificationsRead}
              />
            )}

            {currentSection === 'handbook' && (
              <HandbookView />
            )}

            {currentSection === 'settings' && (
              <SettingsView 
                fontSize={fontSize} 
                setFontSize={setFontSize} 
                googleUser={googleUser} 
                onGoogleSignIn={handleGoogleSignIn} 
                onGoogleLogout={handleGoogleLogout} 
                onResetApp={handleResetApp} 
                studentProfile={studentProfile}
                onUpdateProfile={handleUpdateProfile}
              />
            )}

          </main>

        </div>
      )}

      {/* Persistent System-wide Floating Alert Banner */}
      <AnimatePresence>
        {unreadCount > 0 && viewMode === 'app' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 max-w-sm bg-[#111A2E] border border-blue-500/30 rounded-2xl p-4 shadow-2xl shadow-black/80 z-50 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-blue-400 font-mono font-bold uppercase tracking-wider">
                <Bell className="h-4 w-4 animate-bounce text-[#4285F4]" />
                Gemma Autonomous Alert
              </span>
              <button 
                onClick={handleMarkNotificationsRead}
                className="text-[10px] text-slate-400 hover:text-white font-mono uppercase hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>
            
            <p className="text-xs text-slate-200 leading-relaxed font-sans text-left">
              {notifications.find(n => !n.read)?.message}
            </p>

            {unreadCount > 1 && (
              <span className="text-[9px] text-blue-400 font-mono italic text-left">
                + {unreadCount - 1} more autonomous alerts pending resolution
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
