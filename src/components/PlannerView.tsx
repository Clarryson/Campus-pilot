import React from "react";
import { BookOpen, Clock, MapPin, CheckCircle, Flame, Layers } from "lucide-react";
import { TimetableClass, StudyPlanItem } from "../types";

interface PlannerViewProps {
  timetable: TimetableClass[];
  studyPlans: StudyPlanItem[];
  studyPlanIntensity: "light" | "medium" | "intensive";
  onGenerateStudyPlan: (intensity: "light" | "medium" | "intensive") => void;
}

export default function PlannerView({ 
  timetable, 
  studyPlans, 
  studyPlanIntensity, 
  onGenerateStudyPlan 
}: PlannerViewProps) {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Top Banner Info */}
      <div className="flex flex-col gap-1 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
          Academic Planner Matrix
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Manage, regenerate, and customize your weekly revision blocks and class lectures.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-5 rounded-3xl text-xs shadow-inner">
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2 font-sans text-xs">
            <Layers className="h-4.5 w-4.5 text-cyan-500 animate-spin-slow" />
            Extracted Classes Schedule (Semester Syllabus)
          </h4>
          <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Syllabus extracted autonomously by Gemma from timetable files.</p>
        </div>
        {timetable.some(t => t.version > 1) && (
          <span className="px-3 py-1 text-[10px] font-mono bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 rounded-full font-black">
            Version 2 Active
          </span>
        )}
      </div>

      {/* Week Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {weekDays.map((dayName) => {
          const dayClasses = timetable.filter(t => t.day.toLowerCase() === dayName.toLowerCase());
          const dayPlan = studyPlans.filter(p => p.day.toLowerCase() === dayName.toLowerCase());

          return (
            <div key={dayName} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-4.5 flex flex-col gap-4 min-h-[220px] shadow-sm">
              <div className="text-[10px] uppercase font-mono font-black tracking-wider text-cyan-600 dark:text-cyan-400 text-center pb-2.5 border-b border-slate-100 dark:border-slate-850">
                {dayName}
              </div>
              
              {/* Classes and study lists */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {dayClasses.map((cls) => (
                  <div 
                    key={cls.id} 
                    className={`p-3 rounded-2xl border text-[11px] text-left transition-all ${
                      cls.version > 1 
                        ? "bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/20 text-amber-800 dark:text-amber-300" 
                        : "bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-cyan-900/10 text-slate-700 dark:text-slate-300"
                    }`}
                    title={`${cls.courseName} by ${cls.lecturer}`}
                  >
                    <div className="font-extrabold tracking-tight text-slate-900 dark:text-white">{cls.courseCode}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate">{cls.courseName}</div>
                    <div className="flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-mono mt-2 font-bold">
                      <Clock className="h-3 w-3" />
                      <span>{cls.startTime.split(" ")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate font-mono">
                      <MapPin className="h-3 w-3 text-slate-300 dark:text-slate-700" />
                      <span>{cls.venue}</span>
                    </div>
                  </div>
                ))}

                {/* Study blocks */}
                {dayPlan.map((plan) => (
                  <div key={plan.id} className="p-3 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/15 border border-emerald-500/10 dark:border-emerald-850/25 text-[11px] text-left text-emerald-800 dark:text-emerald-300">
                    <div className="font-mono font-black uppercase tracking-wider text-[8px] text-emerald-600 dark:text-emerald-400">Gemma study block</div>
                    <div className="font-extrabold mt-1 text-slate-900 dark:text-white">{plan.courseCode}</div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate leading-tight">{plan.focusArea}</p>
                    <div className="text-[9px] font-mono mt-2 text-emerald-600 dark:text-emerald-400 font-bold">{plan.timeBlock}</div>
                  </div>
                ))}

                {dayClasses.length === 0 && dayPlan.length === 0 && (
                  <div className="text-[10px] text-slate-300 dark:text-slate-700 text-center py-8 italic font-mono">No tasks staged</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive study plan controller slider/buttons */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-left">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2.5 border border-emerald-100 dark:border-emerald-800/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex-shrink-0">
            <BookOpen className="h-5.5 w-5.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">Configure study plan intensity</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">Adjusting values triggers autonomous reasoning study blocks generation.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {["light", "medium", "intensive"].map((intensity) => (
            <button
              key={intensity}
              onClick={() => onGenerateStudyPlan(intensity as any)}
              className={`px-4 py-2 rounded-xl border text-[10px] uppercase font-mono tracking-wider cursor-pointer transition-all font-bold ${
                studyPlanIntensity === intensity 
                  ? 'bg-emerald-550 dark:bg-emerald-950 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-black shadow-md shadow-emerald-500/5' 
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {intensity}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
