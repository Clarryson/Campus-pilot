import React from "react";
import { Sliders, RefreshCw, RefreshCcw, LogOut, CheckCircle, Smartphone } from "lucide-react";

interface SettingsViewProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  googleUser: any;
  onGoogleSignIn: () => void;
  onGoogleLogout: () => void;
  onResetApp: () => void;
}

export default function SettingsView({
  fontSize,
  setFontSize,
  googleUser,
  onGoogleSignIn,
  onGoogleLogout,
  onResetApp
}: SettingsViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Title */}
      <div className="flex flex-col gap-1 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
          System Configuration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Manage local display preferences, Google Cloud synchronization credentials, and database states.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Left column options */}
        <div className="space-y-6">
          
          {/* Typography configuration block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Typography Sizing</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Adjust the root layout font scale of CampusPilot to optimize legibility across responsive monitors.</p>
            
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-1.5 rounded-2xl w-fit">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  fontSize === 'normal' 
                    ? 'bg-[#4285F4] text-white font-extrabold shadow-md shadow-blue-500/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                A (Standard)
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  fontSize === 'large' 
                    ? 'bg-[#4285F4] text-white font-extrabold shadow-md shadow-blue-500/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                A+ (Large)
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  fontSize === 'xlarge' 
                    ? 'bg-[#4285F4] text-white font-extrabold shadow-md shadow-blue-500/10' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                A++ (Extra)
              </button>
            </div>
          </div>

          {/* Database state management */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
            <span className="text-xs font-mono font-bold text-red-500 dark:text-red-400 uppercase tracking-wider block">Database Administration</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Reset the local application database back to standard hackathon Scenario v1 defaults. This clears all manual uploads.</p>
            
            <button 
              onClick={onResetApp}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-red-500/40 hover:bg-red-500/5 dark:hover:bg-red-950/20 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-all text-xs flex items-center gap-2 font-mono font-bold cursor-pointer"
            >
              <RefreshCcw className="h-4 w-4" />
              <span>Reset Demo Database</span>
            </button>
          </div>

        </div>

        {/* Right column options */}
        <div className="space-y-6">
          
          {/* Google Calendar credentials authentication block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-left space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Google Cloud Integrations</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Synchronize academic course listings and examination milestones live directly to your private Google Calendar account.</p>
            
            {googleUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 border border-emerald-500/20 p-3.5 rounded-2xl shadow-inner">
                  {googleUser.photoURL ? (
                    <img src={googleUser.photoURL} alt="User" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full border border-emerald-500/30 shadow" />
                  ) : (
                    <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-black text-xs font-bold">
                      {googleUser.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="text-left overflow-hidden">
                    <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 font-mono">CALENDAR SYNCED</div>
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 truncate font-mono max-w-[200px]" title={googleUser.email}>
                      {googleUser.email}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onGoogleLogout}
                  className="px-4 py-2 text-xs bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/25 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 cursor-pointer font-mono font-bold"
                >
                  Disconnect Google account
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="px-4 py-3 rounded-2xl border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5 dark:hover:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 hover:text-[#4285F4] dark:hover:text-white transition-all text-xs flex items-center gap-2.5 font-mono font-bold cursor-pointer shadow-sm"
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-4 w-4 shrink-0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>Connect Google Calendar</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
