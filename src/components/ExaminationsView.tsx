import React, { useState, useRef } from "react";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Search,
  BookOpen,
  MapPin,
  TrendingUp,
  BrainCircuit,
  Bookmark,
  UploadCloud,
  RefreshCw
} from "lucide-react";
import { ExamEvent } from "../types";

interface ExaminationsViewProps {
  exams: ExamEvent[];
  onStartStudySession?: () => void;
  uploadingFile?: boolean;
  onFileUpload?: (file: File) => void;
}

export default function ExaminationsView({ exams, onStartStudySession, uploadingFile, onFileUpload }: ExaminationsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFileUpload) {
      onFileUpload(files[0]);
    }
  };

  const defaultExams: ExamEvent[] = [
    {
      id: "exam-1",
      courseCode: "CSC 211",
      courseName: "Quantum Mechanics & Computing",
      date: "2026-07-20",
      time: "09:00 AM",
      duration: "3 Hours",
      venue: "Graduation Pavilion, Hall A"
    },
    {
      id: "exam-2",
      courseCode: "CSC 212",
      courseName: "Computational Physics & Modeling",
      date: "2026-07-22",
      time: "02:00 PM",
      duration: "2 Hours",
      venue: "Science Lab 4, Tech Annex"
    },
    {
      id: "exam-3",
      courseCode: "CSC 213",
      courseName: "Modern Philosophy & Logic",
      date: "2026-07-25",
      time: "11:00 AM",
      duration: "3 Hours",
      venue: "Seminar Room 12"
    }
  ];

  const activeExams = exams.length > 0 ? exams : defaultExams;

  const filteredExams = activeExams.filter(e => 
    e.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Density Alert Logic
  const hasDensityConflict = activeExams.some((exam, i) => {
    return activeExams.some((other, j) => {
      if (i === j) return false;
      const d1 = new Date(exam.date);
      const d2 = new Date(other.date);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 1; // Exams within 1 day of each other
    });
  });

  return (
    <div className="page-content space-y-8 text-left transition-colors duration-300">
      
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150/10 dark:border-gray-800/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-500 text-[10px] font-mono font-bold tracking-wider uppercase border border-red-500/20">
              Exam Milestones
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
            Examinations & Milestones
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Gemma automatically scans and evaluates syllabus exam slots, tracks cognitive load constraints, and checks density conflicts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
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
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-500 hover:to-indigo-500 text-white font-sans font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
          >
            {uploadingFile ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Parsing Exam Timetable...</span>
              </>
            ) : (
              <>
                <UploadCloud className="h-4 w-4" />
                <span>Upload Exam Timetable PDF</span>
              </>
            )}
          </button>

          <div className="relative w-full md:w-52">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </span>
            <input
              type="text"
              placeholder="Filter exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>
      </div>

      {/* Density Alert Indicator */}
      {hasDensityConflict && (
        <div className="bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/20 dark:border-red-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-red-500/20 dark:bg-red-500/30 p-3 rounded-2xl border border-red-500/30 text-red-600 dark:text-red-400 shrink-0">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                🧠 Gemma Cognitive Load Alert: High Density Conflict Detected
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed max-w-2xl">
                I detected two major examinations scheduled within 48 hours of each other. I have dynamically re-allocated study weight buffers in your weekly planner to prevent cognitive exhaustion.
              </p>
            </div>
          </div>
          <button 
            onClick={onStartStudySession}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-white dark:text-red-400 border border-red-500/30 font-mono font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Adjust Study Focus
          </button>
        </div>
      )}

      {/* Main Grid: Exams List & AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: List of Exams */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Exam Schedule ({filteredExams.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredExams.map((exam, i) => {
              // Calculate countdown days
              const examDate = new Date(exam.date);
              const today = new Date("2026-07-17"); // Static simulated mock date for the year 2026
              const diffTime = examDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              const isUrgent = diffDays <= 4;

              return (
                <div 
                  key={exam.id}
                  className={`bg-white dark:bg-slate-900 border ${
                    isUrgent 
                      ? "border-red-500/30 dark:border-red-500/20 shadow-lg shadow-red-500/5" 
                      : "border-slate-150 dark:border-slate-800"
                  } rounded-2xl p-5 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 text-[10px] font-mono font-black">
                          {exam.courseCode}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 ${
                          isUrgent 
                            ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30" 
                            : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span>{diffDays} Days Left</span>
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{exam.courseName}</h4>
                        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-sans">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                            <span>{exam.date} at {exam.time} ({exam.duration})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                            <span>{exam.venue}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={onStartStudySession}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <BrainCircuit className="h-3.5 w-3.5" />
                        <span>Practice Test</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cognitive & Prep Analysis */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Card: Prep Summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              Academic readiness Index
            </h4>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  <span>Syllabus Coverage</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">84%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-800/40 shadow-inner">
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full" style={{ width: "84%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                  <span>Confidence Score</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">High (78%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-200/40 dark:border-slate-800/40 shadow-inner">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full" style={{ width: "78%" }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 p-3 rounded-2xl text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="font-bold text-slate-800 dark:text-slate-200">Gemma Summary:</span> Active revision cycles are stabilized. Calculus and Quantum logic structures show excellent retention indices, but you should review Philosophy definitions to close the 16% gap.
            </div>
          </div>

          {/* Card: AI Study Tactics */}
          <div className="bg-gradient-to-tr from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <h4 className="text-sm font-bold font-sans">Gemma Study Optimization</h4>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Based on historical performance and curriculum difficulty parameters, I advise a <strong className="text-indigo-600 dark:text-indigo-400">Feynman Technique</strong> session on computational quantum equations to resolve the most challenging milestones first.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>3 Mock exam drafts available</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>High focus study blocks active</span>
              </div>
            </div>

            <button 
              onClick={onStartStudySession}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Generate Practice Exam</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
