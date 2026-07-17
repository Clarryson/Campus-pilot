import React, { useRef, useEffect, useState } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Activity, 
  BookOpen, 
  Award,
  Clock,
  Briefcase,
  Layers,
  Compass,
  FileText,
  Terminal,
  Zap,
  TrendingUp,
  BrainCircuit,
  Sliders,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface ChatMessage {
  sender: 'student' | 'gemma';
  text: string;
  timestamp: string;
}

interface AIWorkspaceViewProps {
  chatInput: string;
  setChatInput: (val: string) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (customPrompt?: string) => void;
  isGemmaThinking: boolean;
}

export default function AIWorkspaceView({
  chatInput,
  setChatInput,
  chatMessages,
  onSendMessage,
  isGemmaThinking
}: AIWorkspaceViewProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'console' | 'briefing' | 'decisions'>('console');

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isGemmaThinking]);

  // Premium interactive reasoning timeline representing Gemma continuous background execution
  const reasoningSteps = [
    { id: 1, text: "Gemma agent boot & telemetry handshakes completed", status: "completed" },
    { id: 2, text: "Parsing syllabus PDF metadata constraints", status: "completed" },
    { id: 3, text: "Google Calendar synchronization fully resolved with 0 conflicts", status: "completed" },
    { id: 4, text: "Active cognitive load buffers optimized", status: "active" }
  ];

  const recentDecisions = [
    { title: "Dynamic Schedule Buffer", desc: "Added 30min review buffers before CSC 212 exam slots.", date: "15 minutes ago" },
    { title: "Google Calendar Roster Align", desc: "Pushed 3 modified lecture times to Google Calendar.", date: "2 hours ago" },
    { title: "Scholarship Indexing", desc: "Flagged the Science Grant as matching Year 2 Computer Science parameters.", date: "4 hours ago" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-[#7C4DFF]/10 text-[#7C4DFF] text-[10px] font-mono font-bold tracking-wider uppercase border border-indigo-500/20">
              Agent Terminal
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C4DFF]"></span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
            Gemma 4 AI Workspace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            This is NOT a traditional chatbot. This is your autonomous agent console, supervising active timetables and orchestrating academic priorities in real-time.
          </p>
        </div>
      </div>

      {/* Main Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Reasoning, Briefings & Metrics widget (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Reasoning box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-left">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono block mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#7C4DFF] animate-pulse" />
              Gemma Background Reasoning Steps
            </span>

            <div className="space-y-3">
              {reasoningSteps.map((step) => (
                <div key={step.id} className="flex items-center justify-between text-[11px] font-mono bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                      step.status === "completed" ? "bg-emerald-500" :
                      step.status === "active" ? "bg-indigo-500 animate-pulse" :
                      "bg-slate-300 dark:bg-slate-700"
                    }`} />
                    <span className={`truncate ${step.status === "completed" ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-900 dark:text-white font-bold"}`}>
                      {step.text}
                    </span>
                  </div>
                  <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded font-bold shrink-0 ${
                    step.status === "completed" ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30" :
                    step.status === "active" ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 animate-pulse" :
                    "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}>
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Goal Progress metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4.5 rounded-2xl shadow-sm text-left">
              <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Academic Load Index</div>
              <div className="text-2xl font-black text-emerald-500 font-mono mt-1">Excellent</div>
              <div className="text-[8px] font-mono text-emerald-500 uppercase mt-0.5 font-bold">Stable (84%)</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4.5 rounded-2xl shadow-sm text-left">
              <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Co-Pilot Tuning Pulse</div>
              <div className="text-2xl font-black text-indigo-500 font-mono mt-1">94%</div>
              <div className="text-[8px] font-mono text-indigo-500 uppercase mt-0.5 font-bold">High Precision Match</div>
            </div>
          </div>

          {/* Generated Weekly / Daily Briefings */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-left space-y-3.5">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono block flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#7C4DFF]" />
              Gemma Daily Briefing
            </span>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-150 dark:border-slate-850/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              "Clarryson, today is optimized. I mapped three lecture cycles for your Computer Science syllabus. You have <strong>CSC 211 Quantum Mechanics</strong> at 9:00 AM, followed by <strong>CSC 212 Physics code diagnostics</strong>. Google Calendar is fully up to date."
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Dialogue Console Terminal & Sticky Chat Bottom (col-span-7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl flex flex-col h-[520px] overflow-hidden shadow-sm">
          
          <div className="px-5 py-4 border-b border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-[#7C4DFF]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">Academic Dialogue Console</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-500 font-mono bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-spin-slow" />
              <span>Gemma 4 OS Engine</span>
            </div>
          </div>

          {/* Chat message space */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4 scrollbar-thin bg-slate-50/30 dark:bg-[#0B0F1C]/20">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}>
                
                {/* Sender Tag Banner */}
                <div className="flex items-center gap-1.5 mb-1.5 px-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  {msg.sender === 'student' ? (
                    <>
                      <span>Clarryson (You)</span>
                      <User className="h-3 w-3 text-indigo-500" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-3 w-3 text-purple-500 animate-bounce" />
                      <span className="text-[#7C4DFF] font-bold">Gemma 4 Agent</span>
                    </>
                  )}
                  <span>• {msg.timestamp}</span>
                </div>

                {/* Message Bubble Box */}
                <div className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed text-left shadow-sm ${
                  msg.sender === 'student' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-150 dark:border-slate-850 whitespace-pre-wrap'
                }`}>
                  {msg.sender === 'gemma' ? (
                    <div className="space-y-2">
                      {msg.text.split("\n\n").map((para, pIdx) => {
                        if (para.startsWith("###")) {
                          return <h4 key={pIdx} className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1 font-sans">{para.replace("###", "")}</h4>;
                        }
                        if (para.startsWith("-") || para.startsWith("*")) {
                          return (
                            <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1">
                              {para.split("\n").map((li, lIdx) => (
                                <li key={lIdx}>{li.replace(/^[-\*\s]+/, "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={pIdx} className="leading-relaxed font-sans">{para}</p>;
                      })}
                    </div>
                  ) : (
                    <p className="font-sans font-medium">{msg.text}</p>
                  )}
                </div>

              </div>
            ))}

            {isGemmaThinking && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-1.5 px-1 text-[10px] font-mono text-indigo-500 animate-pulse">
                  <Bot className="h-3 w-3 animate-spin" />
                  <span>Gemma 4 is processing university database constraints...</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-indigo-500/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-3">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="text-xs font-mono text-indigo-500/80 animate-pulse">Running semantic inference modules...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-150 dark:border-slate-850 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
            <button 
              onClick={() => onSendMessage("Show my syllabus details")}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500 text-[10px] rounded-xl whitespace-nowrap cursor-pointer font-mono font-bold"
            >
              Analyze Syllabus
            </button>
            <button 
              onClick={() => onSendMessage("What is my exam schedule?")}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500 text-[10px] rounded-xl whitespace-nowrap cursor-pointer font-mono font-bold"
            >
              Verify Exams
            </button>
            <button 
              onClick={() => onSendMessage("Generate high-intensity study blocks")}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-500 text-[10px] rounded-xl whitespace-nowrap cursor-pointer font-mono font-bold"
            >
              Optimize Study Blocks
            </button>
          </div>

          {/* Dialogue Sticky Input */}
          <div className="p-3 border-t border-slate-150 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/20 flex gap-2 shrink-0">
            <input
              type="text"
              placeholder="Query the academic database or ask Gemma anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
              className="bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-800 focus:border-indigo-500/50 rounded-xl px-4 py-2.5 flex-1 focus:outline-none"
            />
            <button
              onClick={() => onSendMessage()}
              disabled={!chatInput.trim() || isGemmaThinking}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-all cursor-pointer disabled:opacity-40"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
