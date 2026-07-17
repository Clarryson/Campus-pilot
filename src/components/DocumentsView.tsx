import React, { useRef, useEffect, useState } from "react";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  Info, 
  HardDrive,
  Brain,
  Sparkles,
  AlertCircle,
  Calendar,
  BookOpen,
  ClipboardList,
  Clock,
  ChevronRight
} from "lucide-react";
import { DocumentRecord } from "../types";

interface UploadResult {
  fileName: string;
  summary: string;
  type: string;
  itemCount: number;
}

interface DocumentsViewProps {
  documents: DocumentRecord[];
  uploadingFile: boolean;
  uploadingFileName?: string;
  lastUploadResult?: UploadResult | null;
  onFileUpload: (file: File) => void;
}

// Pipeline step definitions
const PIPELINE_STEPS = [
  { id: "save",     label: "Saving File",        icon: UploadCloud,    duration: 800  },
  { id: "extract",  label: "Extracting Text",     icon: FileText,       duration: 1200 },
  { id: "gemma",    label: "Gemma 4 Analyzing",   icon: Brain,          duration: 2500 },
  { id: "classify", label: "Classifying Content", icon: Sparkles,       duration: 1000 },
  { id: "store",    label: "Updating Database",   icon: HardDrive,      duration: 800  },
];

function getDocTypeIcon(type: string) {
  switch (type) {
    case "timetable": return <Calendar className="h-5 w-5 text-blue-500" />;
    case "exam":      return <ClipboardList className="h-5 w-5 text-red-500" />;
    case "handbook":  return <BookOpen className="h-5 w-5 text-purple-500" />;
    default:          return <FileText className="h-5 w-5 text-slate-400" />;
  }
}

function getDocTypeBadge(type: string) {
  const map: Record<string, string> = {
    timetable: "bg-blue-50 text-blue-700 border-blue-200",
    exam:      "bg-red-50 text-red-700 border-red-200",
    handbook:  "bg-purple-50 text-purple-700 border-purple-200",
    assignment:"bg-amber-50 text-amber-700 border-amber-200",
    project:   "bg-emerald-50 text-emerald-700 border-emerald-200",
    error:     "bg-red-50 text-red-700 border-red-200",
  };
  return map[type] || "bg-slate-50 text-slate-600 border-slate-200";
}

export default function DocumentsView({ documents, uploadingFile, uploadingFileName, lastUploadResult, onFileUpload }: DocumentsViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Animate steps when uploadingFile is true
  useEffect(() => {
    if (!uploadingFile) {
      // Reset when done
      setActiveStep(-1);
      setCompletedSteps([]);
      return;
    }

    setActiveStep(0);
    setCompletedSteps([]);

    let cumulativeDelay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    PIPELINE_STEPS.forEach((step, idx) => {
      // Mark step as active
      const activeTimer = setTimeout(() => {
        setActiveStep(idx);
      }, cumulativeDelay);
      timers.push(activeTimer);

      cumulativeDelay += step.duration;

      // Mark step as completed
      const doneTimer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, idx]);
      }, cumulativeDelay);
      timers.push(doneTimer);
    });

    return () => timers.forEach(clearTimeout);
  }, [uploadingFile]);

  const totalDuration = PIPELINE_STEPS.reduce((s, x) => s + x.duration, 0);
  const progressPct = uploadingFile
    ? Math.min(95, Math.round((completedSteps.length / PIPELINE_STEPS.length) * 100))
    : lastUploadResult ? 100 : 0;

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) onFileUpload(e.dataTransfer.files[0]);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onFileUpload(e.target.files[0]);
  };

  const storageUsed = Math.min(100, Math.round((documents.length / 10) * 100));

  return (
    <div className="page-content space-y-8 text-left bg-slate-50">

      {/* Header */}
      <div className="flex flex-col gap-1 pb-6 border-b border-slate-200">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
          Academic Document Pipeline
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xl">
          Upload timetables, exam sheets, handbooks, or assignment briefs. Gemma 4 autonomously classifies, extracts, and updates your dashboard in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left pane */}
        <div className="lg:col-span-8 space-y-5">

          {/* Drop Zone — hidden when uploading */}
          {!uploadingFile && !lastUploadResult && (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 transition-all p-12 rounded-3xl flex flex-col items-center justify-center gap-5 text-center cursor-pointer group shadow-sm"
            >
              <input type="file" ref={fileInputRef} onChange={handleInputChange} accept="application/pdf" className="hidden" />
              <div className="bg-blue-50 p-4 border border-blue-100 text-blue-500 rounded-2xl group-hover:scale-105 transition-transform shadow-inner">
                <UploadCloud className="h-8 w-8" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Click or drag a PDF to upload</div>
                <p className="text-[11px] text-slate-400 mt-1.5 font-mono">Supports PDF up to 25MB — Timetable, Exam Sheet, Handbook, Assignment Brief</p>
              </div>
              <button className="px-4 py-2 bg-[#009BF5] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer hover:bg-blue-600">
                Select Document
              </button>
            </div>
          )}

          {/* Upload another button after result */}
          {!uploadingFile && lastUploadResult && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 transition-all p-6 rounded-3xl flex items-center justify-center gap-3 cursor-pointer group"
            >
              <input type="file" ref={fileInputRef} onChange={handleInputChange} accept="application/pdf" className="hidden" />
              <UploadCloud className="h-5 w-5 text-blue-400 group-hover:text-blue-600" />
              <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">Upload another document</span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* LIVE ANALYSIS PIPELINE — shown while uploading */}
          {/* ═══════════════════════════════════════════ */}
          {(uploadingFile || (lastUploadResult && progressPct < 100)) && (
            <div className="bg-white border border-blue-200 rounded-3xl p-6 shadow-md space-y-5">

              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
                  </span>
                  <div>
                    <p className="text-xs font-black text-slate-900 uppercase tracking-wider">Gemma 4 Analyzing</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate max-w-[220px]">{uploadingFileName || "document.pdf"}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-blue-500 tabular-nums">{progressPct}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-[#009BF5] transition-all duration-700 ease-out"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Step-by-step pipeline */}
              <div className="space-y-2.5">
                {PIPELINE_STEPS.map((step, idx) => {
                  const isDone    = completedSteps.includes(idx);
                  const isActive  = activeStep === idx && !isDone;
                  const isPending = !isDone && !isActive;
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${
                        isDone    ? "bg-emerald-50 border-emerald-200"
                        : isActive ? "bg-blue-50 border-blue-300 shadow-sm"
                        : "bg-slate-50 border-slate-200 opacity-40"
                      }`}
                    >
                      <div className={`flex-shrink-0 ${isDone ? "text-emerald-500" : isActive ? "text-blue-500" : "text-slate-300"}`}>
                        {isDone ? (
                          <CheckCircle className="h-4.5 w-4.5" />
                        ) : isActive ? (
                          <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                        ) : (
                          <Icon className="h-4.5 w-4.5" />
                        )}
                      </div>
                      <span className={`text-xs font-bold font-mono ${
                        isDone ? "text-emerald-700" : isActive ? "text-blue-700" : "text-slate-400"
                      }`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <span className="ml-auto text-[10px] font-mono text-blue-400 animate-pulse">Running...</span>
                      )}
                      {isDone && (
                        <span className="ml-auto text-[10px] font-mono text-emerald-500">Done</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* GEMMA RESULT CARD — shown after upload */}
          {/* ═══════════════════════════════════════════ */}
          {!uploadingFile && lastUploadResult && (
            <div className={`bg-white border rounded-3xl p-6 shadow-md space-y-4 ${
              lastUploadResult.type === 'error' ? 'border-red-200' : 'border-emerald-200'
            }`}>

              {/* Result header */}
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-2xl border flex-shrink-0 ${
                  lastUploadResult.type === 'error'
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-500'
                }`}>
                  {lastUploadResult.type === 'error'
                    ? <AlertCircle className="h-5 w-5" />
                    : <CheckCircle className="h-5 w-5" />
                  }
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900">
                    {lastUploadResult.type === 'error' ? 'Upload Failed' : 'Analysis Complete ✓'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{lastUploadResult.fileName}</p>
                </div>
                <span className={`ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getDocTypeBadge(lastUploadResult.type)}`}>
                  {lastUploadResult.type}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100" />

              {/* Gemma Summary */}
              <div className="flex items-start gap-2.5">
                <Brain className="h-4 w-4 text-[#009BF5] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-black text-[#009BF5] uppercase tracking-widest mb-1">Gemma 4 Assessment</p>
                  <p className="text-xs text-slate-700 leading-relaxed">{lastUploadResult.summary}</p>
                </div>
              </div>

              {/* Quick stats */}
              {lastUploadResult.type !== 'error' && (
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
                    {getDocTypeIcon(lastUploadResult.type)}
                    <p className="text-[10px] text-slate-500 font-mono mt-1 capitalize">{lastUploadResult.type}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-center">
                    <p className="text-lg font-black text-emerald-600">{lastUploadResult.itemCount || '✓'}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">Items Extracted</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-center">
                    <Sparkles className="h-5 w-5 text-blue-500 mx-auto" />
                    <p className="text-[10px] text-slate-500 font-mono mt-1">DB Updated</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Pro tip */}
          <div className="bg-white border border-slate-200 p-5 rounded-3xl flex items-start gap-3.5 shadow-sm">
            <div className="bg-blue-50 p-2.5 border border-blue-100 text-blue-500 rounded-2xl flex-shrink-0">
              <Info className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">Pro Tip: Re-upload for Comparison</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Upload a revised version of a timetable or exam schedule and Gemma 4 will automatically compare it against the previous version — highlighting venue changes, time shifts, and density conflicts.
              </p>
            </div>
          </div>

        </div>

        {/* Right pane */}
        <div className="lg:col-span-4 space-y-5">

          {/* Uploaded Documents History */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-4">Uploaded Documents</span>
            <div className="space-y-2.5 max-h-[280px] overflow-y-auto">
              {documents.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 font-mono">No documents yet</div>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center gap-2.5 hover:border-blue-200 transition-colors">
                    {getDocTypeIcon(doc.type)}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-800 truncate font-mono" title={doc.name}>{doc.name}</div>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-mono mt-0.5">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="capitalize">{doc.type}</span>
                      </div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <HardDrive className="h-4 w-4 text-blue-400" />
                Storage
              </span>
              <span className="text-[10px] font-mono text-slate-400">{documents.length} / 50 files</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200 shadow-inner">
              <div className="bg-gradient-to-r from-blue-500 to-[#009BF5] h-full rounded-full transition-all" style={{ width: `${storageUsed}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">{storageUsed}% used</span>
              <span className="text-slate-400">{50 - documents.length} slots remaining</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
