import React from "react";
import { Award, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { ScholarshipItem } from "../types";

interface ScholarshipsViewProps {
  scholarships: ScholarshipItem[];
}

export default function ScholarshipsView({ scholarships }: ScholarshipsViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Title */}
      <div className="flex flex-col gap-1 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
          Scholarship Discovery Matches
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Gemma automatically crawls and matches your academic profile with active grants and fellowships.
        </p>
      </div>

      <div className="bg-amber-500/10 dark:bg-amber-950/10 border border-amber-500/20 p-5 rounded-3xl text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3.5 shadow-sm">
        <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
        <div>
          <h4 className="font-bold text-amber-700 dark:text-amber-200 font-mono uppercase tracking-wider">Scholarship Crawler Active</h4>
          <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">
            Based on your active Second Year enrollment in Computer Science, Gemma discovered {scholarships.length} highly compatible opportunities with active application deadlines.
          </p>
        </div>
      </div>

      {/* Scholarship Card Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scholarships.length === 0 ? (
          <div className="md:col-span-3 text-center py-12 text-xs text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl">
            No active scholarships loaded
          </div>
        ) : (
          scholarships.map((schol) => (
            <div 
              key={schol.id} 
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-amber-500/30 dark:hover:border-amber-500/20 hover:shadow-lg hover:shadow-indigo-500/2 transition-all group text-left"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-2.5 py-1 rounded-lg uppercase font-black tracking-wider">
                    {schol.provider}
                  </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">{schol.amount}</span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-4 leading-snug group-hover:text-[#4285F4] dark:group-hover:text-cyan-400 transition-colors">
                  {schol.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block uppercase mb-1 font-black">ELIGIBILITY:</span>
                  {schol.eligibility}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span className="font-medium">Deadline: {schol.deadline}</span>
                <a 
                  href="#apply" 
                  className="text-cyan-600 dark:text-cyan-400 hover:text-[#4285F4] dark:hover:text-cyan-300 font-black flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Apply</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Security Check card */}
      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-5 rounded-3xl flex items-center gap-4 shadow-sm text-left">
        <div className="bg-cyan-50 dark:bg-cyan-950/50 p-2.5 border border-cyan-100 dark:border-cyan-800/30 text-cyan-600 dark:text-cyan-400 rounded-xl flex-shrink-0">
          <ShieldCheck className="h-5.5 w-5.5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800 dark:text-white font-mono uppercase tracking-wider">Verified Opportunities Only</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            All listed grants and scholarships are verified manually by university offices or authenticated academic registers. Gemma excludes phishing links or non-verified channels autonomously.
          </p>
        </div>
      </div>

    </div>
  );
}
