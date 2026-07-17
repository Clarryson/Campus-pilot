import React, { useState, useEffect } from "react";
import { Sliders, RefreshCw, RefreshCcw, LogOut, CheckCircle, Smartphone, User, GraduationCap, School } from "lucide-react";

interface StudentProfile {
  name: string;
  university: string;
  course: string;
  department: string;
  year: number;
  semester: number;
  registrationNumber: string;
}

interface SettingsViewProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  googleUser: any;
  onGoogleSignIn: () => void;
  onGoogleLogout: () => void;
  onResetApp: () => void;
  studentProfile: StudentProfile | null;
  onUpdateProfile: (profile: StudentProfile) => Promise<void>;
}

export default function SettingsView({
  fontSize,
  setFontSize,
  googleUser,
  onGoogleSignIn,
  onGoogleLogout,
  onResetApp,
  studentProfile,
  onUpdateProfile
}: SettingsViewProps) {
  const [profileForm, setProfileForm] = useState<StudentProfile>({
    name: "",
    university: "",
    course: "",
    department: "",
    year: 1,
    semester: 1,
    registrationNumber: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (studentProfile) {
      setProfileForm(studentProfile);
    }
  }, [studentProfile]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onUpdateProfile(profileForm);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left bg-slate-50 transition-colors duration-300">
      
      {/* Title */}
      <div className="flex flex-col gap-1 border-b border-slate-200 pb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
          System Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xl">
          Manage local display preferences, Google Cloud credentials, and update student academic profiles to automatically filter uploaded timetables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Student Profile Form (col-span-8) */}
        <form onSubmit={handleProfileSave} className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
              Student Academic Profile
            </span>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Student Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={profileForm.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Clarryson"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Registration Number */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={profileForm.registrationNumber}
                  onChange={handleFormChange}
                  placeholder="e.g. ENG/CS/2024/001"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* University */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">University</label>
                <div className="relative">
                  <School className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="university"
                    value={profileForm.university}
                    onChange={handleFormChange}
                    placeholder="e.g. University of Embu"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Course */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Registered Course / Programme</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    name="course"
                    value={profileForm.course}
                    onChange={handleFormChange}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-9 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Department</label>
                <input
                  type="text"
                  name="department"
                  value={profileForm.department}
                  onChange={handleFormChange}
                  placeholder="e.g. Computer Science"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              {/* Year & Semester */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Year</label>
                  <select
                    name="year"
                    value={profileForm.year}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map(y => (
                      <option key={y} value={y}>Year {y}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Semester</label>
                  <select
                    name="semester"
                    value={profileForm.semester}
                    onChange={handleFormChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {[1, 2, 3].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Form actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-3 bg-[#009BF5] hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Saving changes...</span>
                  </>
                ) : (
                  <span>Save Profile Settings</span>
                )}
              </button>
              {saveSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-mono font-bold">
                  <CheckCircle className="h-4 w-4" />
                  <span>Profile updated & documents re-analyzed successfully!</span>
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Right Column: Other System Preferences (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Typography configuration block */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm text-left space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">Typography Sizing</span>
            <p className="text-xs text-slate-500 leading-relaxed">Adjust the root layout font scale of CampusPilot to optimize legibility across responsive monitors.</p>
            
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl w-fit">
              {['normal', 'large', 'xlarge'].map((size) => (
                <button 
                  key={size}
                  onClick={() => setFontSize(size as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    fontSize === size 
                      ? 'bg-[#009BF5] text-white font-extrabold shadow-md shadow-blue-500/10' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {size === 'normal' ? 'Standard' : size === 'large' ? 'Large' : 'Extra'}
                </button>
              ))}
            </div>
          </div>

          {/* Google Calendar credentials authentication block */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm text-left space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">Google Cloud Integrations</span>
            <p className="text-xs text-slate-500 leading-relaxed">Synchronize academic course listings and examination milestones live directly to your private Google Calendar account.</p>
            
            {googleUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-50 border border-emerald-500/20 p-3.5 rounded-2xl shadow-inner">
                  {googleUser.photoURL ? (
                    <img src={googleUser.photoURL} alt="User" referrerPolicy="no-referrer" className="h-8 w-8 rounded-full border border-emerald-500/30 shadow" />
                  ) : (
                    <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-black text-xs font-bold">
                      {googleUser.displayName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="text-left overflow-hidden">
                    <div className="text-[10px] font-black text-emerald-600 font-mono">CALENDAR SYNCED</div>
                    <div className="text-[10px] text-slate-600 truncate font-mono max-w-[150px]" title={googleUser.email}>
                      {googleUser.email}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onGoogleLogout}
                  className="px-4 py-2 text-xs bg-red-50 border border-red-200 text-red-600 rounded-xl hover:bg-red-100 cursor-pointer font-mono font-bold"
                >
                  Disconnect Google account
                </button>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                className="px-4 py-3 rounded-2xl border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-[#009BF5] transition-all text-xs flex items-center gap-2.5 font-mono font-bold cursor-pointer shadow-sm w-full justify-center"
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

          {/* Database state management */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm text-left space-y-4">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-wider block">Database Administration</span>
            <p className="text-xs text-slate-500 leading-relaxed">Reset the local application database back to standard Scenario v1 defaults. This clears all manual uploads.</p>
            
            <button 
              onClick={onResetApp}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-red-500/40 hover:bg-red-500/5 text-slate-500 hover:text-red-600 transition-all text-xs flex items-center gap-2 font-mono font-bold cursor-pointer w-full justify-center"
            >
              <RefreshCcw className="h-4 w-4" />
              <span>Reset Demo Database</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
