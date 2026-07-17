import React, { useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  RefreshCw, 
  Info, 
  Trash2, 
  HardDrive,
  Clock
} from "lucide-react";
import { DocumentRecord } from "../types";

interface DocumentsViewProps {
  documents: DocumentRecord[];
  uploadingFile: boolean;
  onFileUpload: (file: File) => void;
}

export default function DocumentsView({ documents, uploadingFile, onFileUpload }: DocumentsViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col gap-1 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
          Academic Document Pipeline
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          Upload timetables, exam sheets, or homework briefings. Gemma identifies document types autonomously.
        </p>
      </div>

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left main pane (col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Upload Drag & Drop Box */}
          <div 
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-cyan-500/20 hover:border-cyan-500/50 bg-white dark:bg-slate-900/60 hover:bg-cyan-500/5 dark:hover:bg-cyan-950/10 transition-all p-12 rounded-3xl flex flex-col items-center justify-center gap-5 text-center cursor-pointer group shadow-sm"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="application/pdf"
              className="hidden" 
            />
            
            <div className="bg-cyan-50 dark:bg-cyan-950/40 p-4 border border-cyan-100 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-2xl group-hover:scale-105 transition-transform shadow-inner">
              <UploadCloud className="h-8 w-8" />
            </div>

            <div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white">Click or drag files to upload</div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 font-mono">Support PDF (Max 25MB)</p>
            </div>
            
            <button className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl text-xs font-mono font-bold transition-all shadow-sm cursor-pointer">
              Select Document
            </button>
          </div>

          {/* Interactive Document Processing Checklist Loader */}
          {uploadingFile && (
            <div className="bg-white dark:bg-slate-900 border border-cyan-500/30 p-6 rounded-3xl space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider">Parsing file: Timetable_v2.pdf</span>
                </div>
                <span className="text-xs font-mono text-cyan-500 dark:text-cyan-400 animate-pulse font-bold">60% complete</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800/20 shadow-inner">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full animate-progress" style={{ width: "60%" }} />
              </div>

              {/* Steps status log */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Uploading</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Extracting</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 animate-pulse">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Analyzing</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 dark:text-slate-700">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Finished</span>
                </div>
              </div>
            </div>
          )}

          {/* Multi-upload Warning/Pro Tip Box */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-5 rounded-3xl flex items-start gap-3.5 shadow-sm">
            <div className="bg-cyan-50 dark:bg-cyan-950/40 p-2.5 border border-cyan-100 dark:border-cyan-800/20 text-cyan-600 dark:text-cyan-400 rounded-2xl flex-shrink-0">
              <Info className="h-4.5 w-4.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white font-mono uppercase tracking-wider">Pro Tip: Multi-upload</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                CampusPilot supports uploading revised versions of the same file. Gemma will compare previous Extractions against the new document autonomously, highlighting overlapping calendar schedules and exam density threats instantly.
              </p>
            </div>
          </div>

        </div>

        {/* Right side pane: History and storage logs (col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* History file list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-4">Recent History</span>
            
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto">
              {documents.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500 font-mono">No documents uploaded yet</div>
              ) : (
                documents.map((doc) => (
                  <div key={doc.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-3 rounded-2xl flex items-center justify-between gap-3 hover:border-slate-200 dark:hover:border-slate-800 transition-colors text-left">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <FileText className="h-4.5 w-4.5 text-cyan-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-mono" title={doc.name}>
                          {doc.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-slate-400 hover:text-emerald-500 p-1 rounded-lg transition-colors shrink-0">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Storage Meter box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-left space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                <HardDrive className="h-4.5 w-4.5 text-cyan-400" />
                Storage Usage
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">1.2 GB / 5.0 GB</span>
            </div>

            {/* Storage Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800/20 shadow-inner">
              <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 h-full rounded-full" style={{ width: "24%" }} />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono pt-1">
              <span className="text-slate-400 dark:text-slate-500">24% consumed</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
