import React, { useRef } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Flame, 
  TrendingUp, 
  Sparkles,
  Map,
  ArrowRight,
  Info,
  UploadCloud,
  RefreshCw
} from "lucide-react";
import { TimetableClass, ExamEvent } from "../types";

interface ScheduleViewProps {
  timetable: TimetableClass[];
  exams: ExamEvent[];
  onStartStudySession?: () => void;
  uploadingFile?: boolean;
  onFileUpload?: (file: File) => void;
}

export default function ScheduleView({ timetable, exams, onStartStudySession, uploadingFile, onFileUpload }: ScheduleViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFileUpload) {
      onFileUpload(files[0]);
    }
  };
  // Mock data representing exact classes in screenshot 5
  const mockSchedule = [
    {
      id: "sc-1",
      time: "08:00 AM - 09:30 AM",
      courseName: "Linear Algebra",
      venue: "Main Hall, R-102",
      lecturer: "Dr. Sarah Jenkins",
      status: "completed"
    },
    {
      id: "sc-2",
      time: "10:00 AM - 11:30 AM",
      courseName: "Artificial Intelligence",
      venue: "Science Center, Lab 4",
      lecturer: "Prof. Alan Turing Jr.",
      status: "live"
    },
    {
      id: "sc-3",
      time: "01:00 PM - 02:30 PM",
      courseName: "Cloud Computing",
      venue: "Tech Tower, R-405",
      lecturer: "Dr. Grace Hopper",
      status: "upcoming"
    }
  ];

  return (
    <div className="page-content space-y-8 text-left transition-colors duration-300">
      
      {/* Top Banner Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
            Academic Roadmap & Class Timetable
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Hello Alex, here's your academic roadmap. You have {mockSchedule.length} classes today. Upload your latest class timetable PDF anytime to autonomously sync rooms and times.
          </p>
        </div>

        {/* Quick Upload Action Right inside Class Timetable */}
        <div className="flex items-center gap-3 shrink-0">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
            className="px-5 py-3 bg-gradient-to-r from-[#4285F4] to-[#7C4DFF] hover:from-blue-600 hover:to-purple-600 text-white font-sans font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-102 cursor-pointer disabled:opacity-60"
          >
            {uploadingFile ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Gemma Parsing Timetable...</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                <span>Upload Class Timetable PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Top Banner Metric Alert */}
      <div className="bg-red-500/10 dark:bg-red-950/20 border border-red-500/20 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="bg-red-100 dark:bg-red-950/60 p-2.5 rounded-xl border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400">
            <Flame className="h-5 w-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h4 className="text-[10px] font-bold text-red-600 dark:text-red-400 font-mono uppercase tracking-wider">Upcoming Examination Event</h4>
            <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">Data Structures II</div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Scheduled at the Graduation Pavilion</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl px-5 py-2.5 text-center shadow-sm shrink-0">
          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold">Starts In</div>
          <div className="text-sm font-black text-red-500 dark:text-red-400 font-mono mt-0.5">4h 22m</div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Today's Schedule timeline slots (col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-6">Today's Lectures</span>

            {/* Timeline Roster */}
            <div className="space-y-4 relative pl-4 border-l border-slate-100 dark:border-slate-850">
              {mockSchedule.map((item, idx) => {
                const isLive = item.status === "live";
                const isCompleted = item.status === "completed";
                
                return (
                  <div key={item.id} className="relative">
                    {/* Timeline Node dot */}
                    <span className={`absolute -left-[22.5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                      isLive ? "bg-cyan-500 border-white dark:border-slate-900 ring-4 ring-cyan-500/15 animate-pulse" :
                      isCompleted ? "bg-slate-300 dark:bg-slate-700 border-white dark:border-slate-900" :
                      "bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                    }`} />

                    <div className={`p-4 rounded-2xl border transition-all ${
                      isLive 
                        ? "bg-cyan-50/20 dark:bg-[#14203D] border-cyan-500/30 shadow-md shadow-cyan-500/2" 
                        : isCompleted 
                        ? "bg-slate-50/50 dark:bg-slate-950/20 border-slate-100 dark:border-slate-850 opacity-60" 
                        : "bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850"
                    }`}>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="text-left">
                          {/* Time badge */}
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span className="font-semibold">{item.time}</span>
                            {isLive && (
                              <span className="ml-1.5 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider animate-pulse">
                                Live Now
                              </span>
                            )}
                          </div>

                          <h4 className={`text-sm font-bold text-slate-900 dark:text-white mt-2 ${isCompleted ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                            {item.courseName}
                          </h4>

                          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                              <span>{item.venue}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-slate-300 dark:text-slate-700 font-bold">•</span>
                              <span>{item.lecturer}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions context */}
                        <div className="flex items-center shrink-0">
                          {isLive ? (
                            <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                              <div className="text-[9px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase bg-cyan-500/5 dark:bg-cyan-950/30 border border-cyan-500/20 dark:border-cyan-800/40 px-2.5 py-0.5 rounded-lg">
                                NEXT CLASS STARTS IN 15:24
                              </div>
                              <button 
                                onClick={onStartStudySession}
                                className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-[10px] rounded-xl cursor-pointer transition-all uppercase shadow-md shadow-cyan-500/10"
                              >
                                Open Materials
                              </button>
                            </div>
                          ) : isCompleted ? (
                            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 px-2.5 py-1 rounded-xl text-[9px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 font-bold">
                              <CheckCircle className="h-3 w-3 text-emerald-500" />
                              <span>Completed</span>
                            </div>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Upcoming</span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Exam Detail, Prep stats, Countdown indicators (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Exam detail card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-4">Exam Detail Checklist</span>
            
            <div className="space-y-4">
              
              {/* Difficulty slider indicator */}
              <div>
                <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  <span>Difficulty Indicator</span>
                  <span className="text-red-500 font-black">High Intensity</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800/20 shadow-inner">
                  <div className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full" style={{ width: "90%" }} />
                </div>
              </div>

              {/* Prep status indicators */}
              <div>
                <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                  <span>Preparation Index</span>
                  <span className="text-emerald-500 font-black">On Track (62%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800/20 shadow-inner">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full" style={{ width: "62%" }} />
                </div>
              </div>

              {/* Map Location pin card */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3 overflow-hidden text-left">
                  <div className="bg-cyan-50 dark:bg-cyan-950/60 p-2.5 border border-cyan-100 dark:border-cyan-800/40 text-cyan-600 dark:text-cyan-400 rounded-xl flex-shrink-0">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-black">EXAMINATION VENUE</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">Science Annex, G-12</div>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl text-center shadow-sm flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 cursor-pointer hover:border-cyan-500/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all">
                  <Map className="h-3.5 w-3.5 text-cyan-500" />
                  <span className="font-bold">Map</span>
                </div>
              </div>

              {/* AI Study Recommendation alert */}
              <div className="bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/10 dark:border-indigo-500/20 p-4 rounded-2xl space-y-2 text-left">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold uppercase">
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>AI Study Recommendation</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic font-medium">
                  "You haven't reviewed <span className="text-slate-900 dark:text-white font-bold">Heaps and B-Trees</span> in 12 days. Focus on Chapter 4 tonight to improve your predicted grade from B+ to A."
                </p>
                <button 
                  onClick={onStartStudySession}
                  className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-white flex items-center gap-1 font-bold pt-1.5 cursor-pointer"
                >
                  <span>Start Session</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* Advanced algorithm simple countdown box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between shadow-sm">
            <div className="text-left">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">Advanced Algorithms</h4>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Nov 04 at 2:00 PM</span>
              </div>
            </div>
            <div className="bg-indigo-500/5 dark:bg-indigo-950/30 border border-indigo-500/10 px-4 py-2 rounded-2xl text-center shadow-inner">
              <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-black">Countdown</div>
              <div className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono leading-none mt-1">11d</div>
            </div>
          </div>

          {/* Exam Prep statistics box */}
          <div className="bg-gradient-to-r from-indigo-600 to-[#7C4DFF] border border-indigo-500/20 rounded-3xl p-5 shadow-sm text-white relative overflow-hidden">
            <div className="absolute right-[-10%] bottom-[-10%] opacity-15">
              <TrendingUp className="h-28 w-28 text-white" />
            </div>
            
            <div className="relative z-10 space-y-4 text-left">
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-100">Exam Prep Statistics</h4>
                <p className="text-[11px] text-indigo-100/70 mt-0.5">Aggregate across all 4 upcoming exams</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 border border-white/10 p-3 rounded-2xl text-left shadow-md backdrop-blur-sm">
                  <div className="text-[9px] font-mono text-indigo-100 uppercase font-black">Confidence</div>
                  <div className="text-lg font-black text-white font-mono mt-0.5">78%</div>
                </div>
                <div className="bg-white/10 border border-white/10 p-3 rounded-2xl text-left shadow-md backdrop-blur-sm">
                  <div className="text-[9px] font-mono text-indigo-100 uppercase font-black">Ready Rank</div>
                  <div className="text-lg font-black text-white font-mono mt-0.5">Top 5%</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
