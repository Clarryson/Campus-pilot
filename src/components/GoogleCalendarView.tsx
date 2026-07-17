import React from "react";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  User, 
  AlertCircle, 
  Globe, 
  ChevronRight, 
  LogOut, 
  Sparkles,
  RefreshCw,
  MapPin,
  Check
} from "lucide-react";
import { CalendarEventItem } from "../types";

interface GoogleCalendarViewProps {
  googleUser: any;
  calendarEvents: CalendarEventItem[];
  isSyncingCalendar: boolean;
  onGoogleSignIn: () => void;
  onGoogleLogout: () => void;
  onCalendarSync: () => void;
}

export default function GoogleCalendarView({
  googleUser,
  calendarEvents,
  isSyncingCalendar,
  onGoogleSignIn,
  onGoogleLogout,
  onCalendarSync
}: GoogleCalendarViewProps) {

  const unsyncedCount = calendarEvents.filter(e => !e.gemmaSynced).length;
  const syncedCount = calendarEvents.filter(e => e.gemmaSynced).length;

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 text-[10px] font-mono font-bold tracking-wider uppercase border border-indigo-500/20">
              Integrations
            </span>
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${googleUser ? "bg-emerald-400" : "bg-amber-400"} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${googleUser ? "bg-emerald-500" : "bg-amber-500"}`}></span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
            Google Calendar Sync
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Authorize and map your university course lecture slots and exam dates directly to your active Google Calendar.
          </p>
        </div>

        {/* Sync trigger button */}
        {googleUser && (
          <button 
            onClick={onCalendarSync}
            disabled={isSyncingCalendar || calendarEvents.length === 0}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-40"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncingCalendar ? "animate-spin" : ""}`} />
            <span>{isSyncingCalendar ? "Syncing Calendar..." : "Synchronize Live"}</span>
          </button>
        )}
      </div>

      {/* Integration Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Account connection detail */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Connection Status
            </h3>

            {googleUser ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                  {googleUser.photoURL ? (
                    <img src={googleUser.photoURL} alt="User photo" className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-slate-800" />
                  ) : (
                    <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold font-mono">
                      {googleUser.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {googleUser.displayName}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono truncate">
                      {googleUser.email}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Calendar API scopes verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Conflict detection module active</span>
                  </div>
                </div>

                <button 
                  onClick={onGoogleLogout}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-xs font-mono rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Disconnect Account</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Account Not Connected</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                    Connect your university-linked Google Account to enable live synchronizations to your native devices.
                  </p>
                </div>
                <button 
                  onClick={onGoogleSignIn}
                  className="w-full py-3 bg-[#4285F4] hover:bg-[#357ae8] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>Connect Google Account</span>
                </button>
              </div>
            )}
          </div>

          {/* Gemma Autopilot Alert Box */}
          <div className="bg-gradient-to-tr from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider">Gemma Sync Log</h4>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed italic">
              "I monitor your lecture rosters constantly. When a module lecture room moves or a session time changes, I'll alert you and push updates directly to your calendar."
            </p>
          </div>
        </div>

        {/* Right Column: Events agenda log list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Staged Calendar Events ({calendarEvents.length})
            </h3>
            
            <div className="flex gap-2 text-[10px] font-mono">
              <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                {syncedCount} Synced
              </span>
              <span className="text-indigo-500 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                {unsyncedCount} Staged
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            {calendarEvents.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400 dark:text-slate-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">No staged syllabus events found</div>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Upload your class timetable in the Documents view to automatically generate staged events.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-850 max-h-[460px] overflow-y-auto">
                {calendarEvents.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${item.gemmaSynced ? "bg-emerald-500" : "bg-indigo-500"}`} />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[280px]">
                          {item.title}
                        </h4>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-slate-100 dark:bg-slate-950 text-slate-500 rounded border border-slate-200/50 dark:border-slate-800">
                          {item.source}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(item.startTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[150px]">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {item.gemmaSynced ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 px-2.5 py-1 rounded-xl flex items-center gap-1">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="hidden sm:inline">Synced</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 px-2.5 py-1 rounded-xl flex items-center gap-1 animate-pulse">
                          <Clock className="h-3.5 w-3.5 text-indigo-500" />
                          <span className="hidden sm:inline">Staged</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
