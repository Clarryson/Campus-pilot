import React from "react";
import { motion } from "motion/react";
import { 
  Compass, 
  ArrowRight, 
  UploadCloud, 
  Calendar, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Sparkles, 
  Search, 
  MessageSquare, 
  GraduationCap
} from "lucide-react";

interface LandingPageProps {
  onLaunchApp: (initialSection?: string) => void;
  googleUser: any;
  onGoogleSignIn: () => void;
}

export default function LandingPage({ onLaunchApp, googleUser, onGoogleSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#060B18] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-950/10 blur-[150px] pointer-events-none" />

      {/* Top Banner Header */}
      <header className="border-b border-gray-900 bg-[#060B18]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onLaunchApp('dashboard')}>
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md opacity-40"></div>
              <div className="relative bg-[#0E172B] border border-cyan-500/30 p-2.5 rounded-xl text-cyan-400">
                <Compass className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                CampusPilot
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full border border-cyan-500/20 bg-cyan-950/40 text-cyan-400 font-bold">AI</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-mono">Academic AI Co-pilot</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <span className="px-2 py-0.5 bg-purple-950/50 border border-purple-800 text-purple-300 rounded text-xs uppercase font-mono font-bold tracking-wider">
              Gemma v2.0
            </span>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {googleUser ? (
              <div className="flex items-center gap-2 bg-[#0E172B] border border-emerald-500/20 px-3 py-1.5 rounded-xl">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-mono max-w-[100px] truncate">
                  {googleUser.displayName || "Google Active"}
                </span>
              </div>
            ) : (
              <button 
                onClick={onGoogleSignIn}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 border border-gray-800 hover:border-cyan-500/30 rounded-xl text-xs font-mono text-gray-300 hover:text-cyan-400 transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}
            
            <button
              onClick={() => onLaunchApp('dashboard')}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-950/40 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Launch Pilot</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Hero Left Content */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          
          <div className="inline-flex items-center gap-2 bg-cyan-950/30 border border-cyan-500/20 px-3.5 py-1.5 rounded-full w-fit">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider">Your academic operations center</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Autonomous</span> <br />Academic Agent
          </h2>

          <p className="text-base text-gray-400 leading-relaxed max-w-xl">
            Streamline your university life with CampusPilot. From instant timetable extraction to personalized study plans, let our AI handle the logistics while you focus on learning.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
            <button
              onClick={() => onLaunchApp('documents')}
              className="px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <UploadCloud className="h-4.5 w-4.5" />
              <span>Upload Timetable</span>
            </button>

            <button
              onClick={() => onLaunchApp('dashboard')}
              className="px-6 py-3.5 border border-gray-800 hover:border-cyan-500/30 bg-[#0A0F1D]/40 hover:bg-cyan-950/10 text-gray-300 hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-900">
            <div>
              <div className="text-2xl font-black text-white font-mono">100%</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Autonomous extraction</div>
            </div>
            <div className="h-8 w-px bg-gray-900" />
            <div>
              <div className="text-2xl font-black text-cyan-400 font-mono">&lt; 2s</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Calendar generation</div>
            </div>
            <div className="h-8 w-px bg-gray-900" />
            <div>
              <div className="text-2xl font-black text-purple-400 font-mono">98%</div>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Scholarship fit rate</div>
            </div>
          </div>

        </div>

        {/* Hero Right Floating Graphics */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] w-full mt-8 lg:mt-0">
          
          {/* Main Visual background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 rounded-3xl" />
          
          {/* Main Glowing Orbital ring */}
          <div className="absolute h-80 w-80 rounded-full border border-cyan-500/10 animate-spin-slow flex items-center justify-center">
            <div className="h-60 w-60 rounded-full border border-dashed border-purple-500/10" />
          </div>

          {/* FLOATING CARD 1: Extracting Timetable Progress */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-4 left-6 md:left-12 bg-[#0E172B]/95 border border-cyan-500/30 p-4 rounded-2xl shadow-2xl shadow-black/80 max-w-[260px] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">Extracting PDF...</span>
            </div>
            
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between text-gray-400 bg-[#060B18]/60 p-2 rounded-lg border border-gray-900">
                <span className="truncate">Linear Algebra</span>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between text-gray-400 bg-[#060B18]/60 p-2 rounded-lg border border-gray-900">
                <span className="truncate">Artificial Intelligence</span>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between text-cyan-300 bg-cyan-950/20 p-2 rounded-lg border border-cyan-900/30 animate-pulse">
                <span className="truncate">Cloud Computing</span>
                <span className="text-[9px] font-mono text-cyan-400 font-bold">85%</span>
              </div>
            </div>
          </motion.div>

          {/* FLOATING CARD 2: Course confirmed card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-6 md:right-12 top-20 bg-[#0E172B]/95 border border-purple-500/20 p-4 rounded-2xl shadow-2xl shadow-black/80 max-w-[220px] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-purple-400 font-mono text-[10px] uppercase font-bold mb-2">
              <Calendar className="h-3.5 w-3.5 text-purple-400" />
              <span>Syllabus Sync</span>
            </div>
            <div className="text-white font-bold text-xs">Artificial Intelligence</div>
            <div className="text-[10px] text-gray-400 mt-1">Science Center, Lab 4</div>
            
            <div className="mt-3 bg-emerald-950/40 border border-emerald-500/20 px-2 py-1 rounded text-[9px] text-emerald-400 font-mono font-bold flex items-center gap-1.5 w-fit">
              <CheckCircle className="h-3 w-3" />
              <span>Google Calendar OK</span>
            </div>
          </motion.div>

          {/* FLOATING CARD 3: Scholarship Found */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute bottom-6 left-12 bg-[#0E172B]/95 border border-emerald-500/20 p-4 rounded-2xl shadow-2xl shadow-black/80 max-w-[250px] backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono bg-emerald-950/80 border border-emerald-800 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold">
                Scholarship Found
              </span>
              <span className="text-emerald-400 font-bold text-xs font-mono">$5,000</span>
            </div>
            <div className="text-white font-bold text-xs leading-snug">Global Innovators Grant 2026</div>
            <p className="text-[9px] text-gray-400 mt-1 leading-normal">
              Matched based on your Yr 2 Computer Science transcript.
            </p>
          </motion.div>

          {/* Central Rocket Co-pilot Badge omitted per request */}

        </div>

      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 md:py-24 border-t border-gray-900">
        
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold">EVERYTHING YOU NEED TO EXCEL</span>
          <h3 className="text-3xl font-black text-white">Logistical Intelligence for Academics</h3>
          <p className="text-sm text-gray-400">
            Let the agent organize schedules, detect examination gaps, match funding options, and answer course syllabi constraints instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Calendar Sync */}
          <div className="bg-[#0E172B]/60 border border-gray-900 rounded-3xl p-6 shadow-xl hover:border-cyan-500/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Automatic Calendar Sync</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Simply snap a photo or upload a PDF of your timetable. Gemma 4 extracts every lecture and lab, syncing them directly to your device.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('schedule')}
              className="mt-6 flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-white transition-all w-fit cursor-pointer group/btn"
            >
              <span>Explore Schedule</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Study Plans */}
          <div className="bg-[#0E172B]/60 border border-gray-900 rounded-3xl p-6 shadow-xl hover:border-purple-500/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-purple-950/40 border border-purple-500/20 text-purple-400 p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">AI Study Plans</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Our agent analyzes your curriculum and identifies optimal study blocks, generating personalized revision schedules that adapt to your pace.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('planner')}
              className="mt-6 flex items-center gap-1 text-[11px] font-mono text-purple-400 hover:text-white transition-all w-fit cursor-pointer group/btn"
            >
              <span>Explore Planner</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Scholarship Discovery */}
          <div className="bg-[#0E172B]/60 border border-gray-900 rounded-3xl p-6 shadow-xl hover:border-emerald-500/20 transition-all group flex flex-col justify-between">
            <div>
              <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Scholarship Discovery</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Never miss a funding opportunity. We scan thousands of databases to match your academic profile with relevant scholarships and grants.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('scholarships')}
              className="mt-6 flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-white transition-all w-fit cursor-pointer group/btn"
            >
              <span>Explore Scholarships</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </section>

      {/* Ask anything, know everything Dark Dashboard Widget card representation */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        
        <div className="bg-gradient-to-b from-[#0F1836] to-[#0A0E23] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-blue-950/10 blur-[80px] pointer-events-none" />

          {/* Text Left */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            <span className="text-[10px] uppercase font-mono tracking-wider bg-indigo-950 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-full w-fit">
              Co-pilot Workspace
            </span>

            <h3 className="text-2xl md:text-3xl font-black text-white">Ask anything, know everything.</h3>
            
            <p className="text-xs text-gray-400 leading-relaxed">
              Your CampusPilot AI Workspace runs live queries across your parsed lecture notes, homework guidelines, and syllabus definitions. Speak with Gemma to resolve complexity in seconds.
            </p>

            {/* Bullets checklist */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <div className="h-5 w-5 rounded-lg bg-[#111C3A] border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span>Summarize 50-page research papers in seconds.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <div className="h-5 w-5 rounded-lg bg-[#111C3A] border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span>Generate flashcards based on lecture recordings.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <div className="h-5 w-5 rounded-lg bg-[#111C3A] border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span>Draft bibliography citations in any format.</span>
              </div>
            </div>

            <button
              onClick={() => onLaunchApp('ai-workspace')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              <span>Enter AI Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

          {/* Interactive chat representation Right */}
          <div className="lg:col-span-6 bg-[#060A13] border border-gray-800 rounded-2xl p-4 shadow-2xl h-[280px] flex flex-col justify-between font-mono text-[11px] text-gray-400">
            
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-900">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-white">Live Workspace Chat</span>
              </div>
              <span className="text-[8px] border border-indigo-800 bg-indigo-950/40 text-indigo-400 px-1.5 py-0.5 rounded">
                Gemma 4 Real-time
              </span>
            </div>

            {/* Chat list mock */}
            <div className="space-y-3 flex-1 overflow-y-auto py-3 pr-1 scrollbar-none">
              <div className="text-right">
                <span className="text-[8px] text-gray-600 block mb-0.5">Alex (Student)</span>
                <span className="inline-block bg-[#111C3A] text-white px-3 py-1.5 rounded-xl rounded-tr-none text-[10px] text-left">
                  Find me CS scholarships in Embu...
                </span>
              </div>
              <div className="text-left">
                <span className="text-[8px] text-cyan-400 block mb-0.5">Gemma Autonomous Agent</span>
                <div className="bg-[#0E1527] border border-gray-800 p-2.5 rounded-xl rounded-tl-none space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-[9px] animate-pulse">
                    <span className="h-1 w-3 bg-cyan-400 rounded animate-bounce" />
                    <span>LIVE SEARCHING...</span>
                  </div>
                  <p className="text-[9px] text-[#A3AED0]">Crawling Embu community databases and international tech funding channels...</p>
                </div>
              </div>
            </div>

            {/* Mock input bottom */}
            <div className="pt-2 border-t border-gray-900 flex gap-2 items-center">
              <div className="flex-1 bg-[#090D18] border border-gray-900 rounded-xl px-3 py-2 flex items-center justify-between text-[10px]">
                <span className="text-gray-600">Ask your co-pilot anything...</span>
                <Search className="h-3 w-3 text-gray-600" />
              </div>
              <div className="bg-cyan-600 p-2 rounded-xl text-black">
                <ArrowRight className="h-3 w-3 text-white" />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 bg-[#04070F] px-6 py-8 text-xs text-gray-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CampusPilot AI. Powered by Gemma.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:underline">Privacy</a>
            <a href="#terms" className="hover:underline">Terms</a>
            <a href="#support" className="hover:underline">Support</a>
            <a href="#api" className="hover:underline">API</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
