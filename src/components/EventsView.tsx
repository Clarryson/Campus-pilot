import React from "react";
import { Activity, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { CampusEventItem } from "../types";

interface EventsViewProps {
  campusEvents: CampusEventItem[];
}

export default function EventsView({ campusEvents }: EventsViewProps) {
  return (
    <div className="page-content space-y-8 text-left transition-colors duration-300">
      
      {/* Title */}
      <div className="flex flex-col gap-1 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
          Recommended Campus Tech Events
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Stay connected with active developer communities, hackathons, and research gatherings.
        </p>
      </div>

      {/* Events list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campusEvents.length === 0 ? (
          <div className="md:col-span-3 text-center py-12 text-xs text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl">
            No campus events registered currently
          </div>
        ) : (
          campusEvents.map((ev) => (
            <div 
              key={ev.id} 
              className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-cyan-500/30 dark:hover:border-cyan-500/20 hover:shadow-lg hover:shadow-indigo-500/2 transition-all group text-left"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">
                  <Calendar className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{ev.date}</span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-4 leading-snug group-hover:text-[#4285F4] dark:group-hover:text-cyan-400 transition-colors">
                  {ev.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{ev.location}</span>
                </span>
                
                <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 font-mono flex items-center gap-0.5">
                  <span>{ev.time}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
