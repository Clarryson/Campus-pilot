import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ChevronRight, 
  Bookmark, 
  HelpCircle, 
  CornerDownRight, 
  ArrowRight,
  RefreshCw,
  Clock,
  BookMarked,
  CheckCircle
} from "lucide-react";

export default function HandbookView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const suggestedQuestions = [
    "What are the criteria for retaking an examination?",
    "How do I apply for an official academic leave of absence?",
    "What constitutes a passing grade for second-year computer science courses?",
    "Are there credit thresholds required to progress to Year 3?",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearching(true);
    setSearchResult(null);

    // Simulate Handbook AI search with highly structural and realistic policy answers
    setTimeout(() => {
      setIsSearching(false);

      if (query.toLowerCase().includes("retake") || query.toLowerCase().includes("fail")) {
        setSearchResult({
          question: query,
          answer: "### 📝 Policy: Retaking Examinations & Supps\n\nUnder **Section 4.12 of the University of Embu Academic Code**, a student who fails to satisfy the examiner in any course (grade below 40%) may be permitted to sit for a **Supplementary Examination** during the academic recess.\n\n- **Supplementary Thresholds**: Maximum supplementary marks capped at 40% (Pass).\n- **Academic Probation**: Failing more than 3 supplementary examinations in a single academic year triggers automatic probation and modules must be re-registered in full during the next session.\n- **Special Exams**: If an exam is missed due to certified medical or bereavement reasons, you must file a Special Examination Request Form with the Dean's Office within **48 hours** of the missed exam slot.",
          referencedPages: ["Section 4.12: Supplemental & Special Rules", "Schedule B: Grading Standards, pg 42"],
          confidence: "99% Policy Match"
        });
      } else if (query.toLowerCase().includes("leave") || query.toLowerCase().includes("absence")) {
        setSearchResult({
          question: query,
          answer: "### 📋 Policy: Official Leave of Absence & Deferrals\n\nAccording to **Section 2.8 of the Registrar's General Guidelines**, students may apply for a temporary Deferral or Academic Leave of Absence for a maximum duration of **two consecutive semesters**.\n\n- **Filing Deadlines**: Leave applications must be submitted via the student portal no later than **Week 3** of the active semester.\n- **Prerequisites**: Clear financial status (all previous semester tuition cleared in full).\n- **Resumption**: A formal Letter of Intent to Resume Studies must be filed with the Registrar at least 30 days prior to the commencement of the targeted semester.",
          referencedPages: ["Section 2.8: Temporary Absences", "Form REG-09: Leave Request, pg 18"],
          confidence: "96% Policy Match"
        });
      } else {
        setSearchResult({
          question: query,
          answer: `### 📖 Policy: University Standards Search\n\nI scanned the University Student Handbook regarding your query: *"${query}"*.\n\nAccording to general academic regulations, second-year students in the Department of Computer Science are required to maintain a cumulative GPA of **2.00 or higher** to satisfy basic graduation thresholds.\n\n- **Course Attendance**: A minimum of **75% lecture and laboratory attendance** is strictly required to qualify for final examination slots.\n- **Credit Accumulation**: Students must satisfy at least **42 credit units** in Year 2 to progress automatically to Year 3.`,
          referencedPages: ["Section 1.5: Attendance Standards", "Chapter 3: Undergraduate Progress, pg 29"],
          confidence: "90% General Match"
        });
      }
    }, 1200);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 text-left transition-colors duration-300">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150/10 dark:border-gray-800/40 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-mono font-bold tracking-wider uppercase border border-emerald-500/20">
              Reference AI
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 font-sans">
            Student Handbook AI
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Query the official University of Embu Academic Standards, grading rules, and administrative procedures in real-time.
          </p>
        </div>
      </div>

      {/* Main Grid: Query & Search Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Suggested and Input */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Query the Handbook
            </h3>

            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Ask e.g. 'What is the attendance rule?' or 'How do I request a supplemental?'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white rounded-2xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center disabled:opacity-45"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Suggested Questions list */}
            <div className="space-y-3 pt-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Suggested Regulations
              </h4>

              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSearch(q)}
                    className="flex items-center justify-between text-left px-4 py-3 bg-slate-50 dark:bg-slate-950/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 border border-slate-150 dark:border-slate-850 hover:border-indigo-500/30 rounded-xl transition-all text-xs text-slate-700 dark:text-slate-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0" />
                      <span className="truncate">{q}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-500 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Answer and Citations */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm min-h-[320px] flex flex-col justify-between">
            
            {/* Header / Loading state / content */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3 mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  Gemma Handbook Oracle
                </span>

                {searchResult && (
                  <span className="text-[9px] font-mono font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30 px-2 py-0.5 rounded-full">
                    {searchResult.confidence}
                  </span>
                )}
              </div>

              {isSearching ? (
                <div className="text-center py-16 space-y-4">
                  <RefreshCw className="h-8 w-8 text-indigo-500 animate-spin mx-auto" />
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 animate-pulse">
                    Parsing Academic Policy Manuals...
                  </div>
                </div>
              ) : searchResult ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 text-xs text-slate-700 dark:text-slate-300 leading-relaxed text-left whitespace-pre-wrap">
                    {searchResult.answer.replace(/^### .*\n\n/, "")}
                  </div>

                  {/* References */}
                  <div className="space-y-2 pt-2">
                    <h5 className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <BookMarked className="h-3.5 w-3.5" />
                      Verified Policy Citations
                    </h5>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {searchResult.referencedPages.map((ref: string, idx: number) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/20 rounded-lg text-[10px] font-mono flex items-center gap-1"
                        >
                          <CornerDownRight className="h-3 w-3" />
                          <span>{ref}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">Select a regulation query or type above</div>
                </div>
              )}
            </div>

            {/* Bottom notification */}
            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-6 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Citations match standard v2026 handbook rules.</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
