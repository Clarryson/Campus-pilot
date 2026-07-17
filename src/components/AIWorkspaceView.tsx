import React, { useRef, useEffect, useState } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Activity,
  Terminal,
  Zap,
  CheckCircle,
  XCircle,
  RefreshCw,
  Brain,
  Clock,
  FileText,
  Calendar,
  BookOpen,
  ClipboardList,
  AlertTriangle,
  UploadCloud,
  Database,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { GemmaActivityLog } from "../types";

interface ChatMessage {
  sender: "student" | "gemma";
  text: string;
  timestamp: string;
}

interface AIWorkspaceViewProps {
  chatInput: string;
  setChatInput: (val: string) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (customPrompt?: string) => void;
  isGemmaThinking: boolean;
  gemmaActivities: GemmaActivityLog[];
  isUploadingFile?: boolean;
  uploadingFileName?: string;
}

// Map activity category to icon + color
function getCategoryStyle(category: string) {
  const map: Record<string, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
    Timetable: {
      icon: <Calendar className="h-3.5 w-3.5" />,
      bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200"
    },
    Exam: {
      icon: <ClipboardList className="h-3.5 w-3.5" />,
      bg: "bg-red-50", text: "text-red-600", border: "border-red-200"
    },
    "Study Plan": {
      icon: <BookOpen className="h-3.5 w-3.5" />,
      bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200"
    },
    Calendar: {
      icon: <Calendar className="h-3.5 w-3.5" />,
      bg: "bg-green-50", text: "text-green-600", border: "border-green-200"
    },
    Scholarship: {
      icon: <Sparkles className="h-3.5 w-3.5" />,
      bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200"
    },
    Alert: {
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200"
    },
    System: {
      icon: <Database className="h-3.5 w-3.5" />,
      bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200"
    },
  };
  return map[category] || map["System"];
}

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function AIWorkspaceView({
  chatInput,
  setChatInput,
  chatMessages,
  onSendMessage,
  isGemmaThinking,
  gemmaActivities,
  isUploadingFile,
  uploadingFileName,
}: AIWorkspaceViewProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isGemmaThinking]);

  const recentActivities = gemmaActivities.slice(0, 20);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left bg-slate-50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-mono font-bold tracking-wider uppercase border border-indigo-200">
              Agent Terminal
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 font-sans">
            Gemma 4 AI Workspace
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Live activity feed showing every operation Gemma 4 performs — uploads, analysis, tool calls, DB updates.
          </p>
        </div>

        {/* Status chips */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold ${
            isGemmaThinking || isUploadingFile
              ? "bg-indigo-50 text-indigo-600 border-indigo-200"
              : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}>
            {isGemmaThinking || isUploadingFile
              ? <RefreshCw className="h-3 w-3 animate-spin" />
              : <CheckCircle className="h-3 w-3" />
            }
            {isGemmaThinking ? "Reasoning..." : isUploadingFile ? "Analyzing PDF..." : "Ready"}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-slate-100 text-slate-600 border-slate-200 text-[10px] font-mono font-bold">
            <Activity className="h-3 w-3" />
            {recentActivities.length} events logged
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ═══════════════════════════════════════════ */}
        {/* LEFT: Live Activity Feed */}
        {/* ═══════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-4">

          {/* Upload in progress banner */}
          {isUploadingFile && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <div className="bg-white border border-indigo-200 p-2 rounded-xl flex-shrink-0">
                <UploadCloud className="h-4 w-4 text-indigo-500 animate-bounce" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-indigo-700 uppercase tracking-wider">Gemma 4 Processing Document</p>
                <p className="text-[10px] text-indigo-500 font-mono truncate mt-0.5">{uploadingFileName || "document.pdf"}</p>
              </div>
              <RefreshCw className="h-4 w-4 text-indigo-400 animate-spin flex-shrink-0" />
            </div>
          )}

          {/* AI thinking banner */}
          {isGemmaThinking && !isUploadingFile && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              <div className="bg-white border border-purple-200 p-2 rounded-xl flex-shrink-0">
                <Brain className="h-4 w-4 text-purple-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-black text-purple-700 uppercase tracking-wider">Gemma 4 Reasoning</p>
                <p className="text-[10px] text-purple-500 font-mono mt-0.5">Processing your query against academic database...</p>
              </div>
              <span className="flex h-2 w-2 relative flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
            </div>
          )}

          {/* Activity Feed */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-indigo-500" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">Live Activity Log</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Real-time Gemma 4 operations</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
              {recentActivities.length === 0 ? (
                <div className="p-8 text-center">
                  <Brain className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-mono">No activity yet.</p>
                  <p className="text-[10px] text-slate-300 font-mono mt-1">Upload a document or ask Gemma a question.</p>
                </div>
              ) : (
                recentActivities.map((activity, idx) => {
                  const style = getCategoryStyle(activity.category);
                  const isExpanded = expandedActivity === activity.id;
                  const isFirst = idx === 0 && (isGemmaThinking || isUploadingFile);

                  return (
                    <div
                      key={activity.id}
                      className={`px-4 py-3 transition-colors cursor-pointer hover:bg-slate-50 ${isFirst ? "bg-indigo-50/40" : ""}`}
                      onClick={() => setExpandedActivity(isExpanded ? null : activity.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Category icon */}
                        <div className={`flex-shrink-0 p-1.5 rounded-lg border ${style.bg} ${style.text} ${style.border} mt-0.5`}>
                          {style.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-slate-900 leading-snug">{activity.message}</p>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}>
                                {activity.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-2.5 w-2.5 text-slate-300" />
                            <span className="text-[9px] text-slate-400 font-mono">{timeAgo(activity.timestamp)}</span>
                            {isExpanded
                              ? <ChevronUp className="h-2.5 w-2.5 text-slate-400 ml-auto" />
                              : <ChevronDown className="h-2.5 w-2.5 text-slate-400 ml-auto" />
                            }
                          </div>

                          {/* Expanded reasoning */}
                          {isExpanded && activity.reasoning && (
                            <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3">
                              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1.5">
                                🧠 Gemma 4 Reasoning
                              </p>
                              <p className="text-[10px] text-slate-600 font-mono leading-relaxed">
                                {activity.reasoning}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* RIGHT: Chat Console */}
        {/* ═══════════════════════════════════════════ */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl flex flex-col h-[600px] overflow-hidden shadow-sm">

          {/* Console header */}
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-indigo-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">Academic Dialogue Console</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-600 font-mono bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              <Zap className="h-3 w-3" />
              <span>Gemma 4 26B</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-slate-50/40">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.sender === "student" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-1.5 mb-1.5 px-1 text-[10px] font-mono text-slate-400">
                  {msg.sender === "student" ? (
                    <>
                      <span>You</span>
                      <User className="h-3 w-3 text-indigo-500" />
                    </>
                  ) : (
                    <>
                      <Bot className="h-3 w-3 text-indigo-500" />
                      <span className="text-indigo-500 font-bold">Gemma 4</span>
                    </>
                  )}
                  <span>• {msg.timestamp}</span>
                </div>
                <div className={`p-4 rounded-2xl max-w-[85%] text-xs leading-relaxed text-left shadow-sm ${
                  msg.sender === "student"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-200"
                }`}>
                  {msg.sender === "gemma" ? (
                    <div className="space-y-2">
                      {msg.text.split("\n\n").map((para, pIdx) => {
                        if (para.startsWith("###")) {
                          return <h4 key={pIdx} className="text-sm font-bold text-slate-900 mt-2 mb-1">{para.replace(/^#+\s*/, "")}</h4>;
                        }
                        if (para.startsWith("-") || para.startsWith("*")) {
                          return (
                            <ul key={pIdx} className="list-disc pl-4 space-y-1">
                              {para.split("\n").map((li, lIdx) => (
                                <li key={lIdx}>{li.replace(/^[-*\s]+/, "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={pIdx} className="leading-relaxed">{para}</p>;
                      })}
                    </div>
                  ) : (
                    <p className="font-medium">{msg.text}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Thinking indicator */}
            {isGemmaThinking && (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-1.5 px-1 text-[10px] font-mono text-indigo-500 animate-pulse">
                  <Bot className="h-3 w-3 animate-spin" />
                  <span>Gemma 4 is reasoning over your academic context...</span>
                </div>
                <div className="bg-white border border-indigo-200 p-3 rounded-2xl rounded-tl-none flex items-center gap-3 shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  <span className="text-xs font-mono text-indigo-500/80 animate-pulse">Running semantic inference...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
            {[
              ["Show my timetable", "Show my timetable"],
              ["Upcoming exams", "What are my upcoming exams?"],
              ["Generate study plan", "Generate a high-intensity study plan"],
              ["Find scholarships", "Search for scholarships I qualify for"],
            ].map(([label, prompt]) => (
              <button
                key={label}
                onClick={() => onSendMessage(prompt)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 text-[10px] rounded-xl whitespace-nowrap font-mono font-bold transition-all"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask Gemma 4 anything about your academic schedule..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
              className="bg-white text-xs text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-indigo-400 rounded-xl px-4 py-2.5 flex-1 focus:outline-none transition-colors"
            />
            <button
              onClick={() => onSendMessage()}
              disabled={!chatInput.trim() || isGemmaThinking}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
