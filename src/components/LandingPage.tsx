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
  GraduationCap,
  Phone,
  Mail,
  Play,
  ArrowUpRight,
  Shield,
  Layers,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
  TrendingUp,
  Globe
} from "lucide-react";

interface LandingPageProps {
  onLaunchApp: (initialSection?: string) => void;
  googleUser: any;
  onGoogleSignIn: () => void;
}

export default function LandingPage({ onLaunchApp, googleUser, onGoogleSignIn }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#4285F4] selection:text-white overflow-x-hidden relative">
      
      {/* Top Header Contact Bar */}
      <div className="bg-[#0A1128] text-slate-400 text-[11px] px-6 py-2 border-b border-slate-900 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5 text-[#009BF5]" />
              <span>support@campuspilot.ai</span>
            </span>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#009BF5]" />
              <span>+1 (206) 555-0112</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Globe className="h-3.5 w-3.5 text-[#009BF5]" />
              <span>English</span>
            </span>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onLaunchApp('dashboard')}>
            <img src="/assets/logo.jpg" alt="CampusPilot Logo" className="h-9 w-9 rounded-xl object-cover shadow-sm shadow-blue-500/10" />
            <div className="text-left">
              <h1 className="text-xl font-bold tracking-tight text-[#0A1128] flex items-center gap-1.5 leading-none">
                CampusPilot
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full border border-[#009BF5]/20 bg-[#009BF5]/10 text-[#009BF5] font-black">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Academic AI Co-pilot</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-[#009BF5] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#009BF5] transition-colors">How It Works</a>
            <a href="#workspace" className="hover:text-[#009BF5] transition-colors">AI Workspace</a>
            <a href="#stats" className="hover:text-[#009BF5] transition-colors">Statistics</a>
            <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-full text-[10px] uppercase font-mono font-bold tracking-wider">
              Gemma v2.0
            </span>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {googleUser ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs text-emerald-700 font-mono max-w-[100px] truncate">
                  {googleUser.displayName || "Google Active"}
                </span>
              </div>
            ) : (
              <button 
                onClick={onGoogleSignIn}
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 border border-slate-200 hover:border-[#009BF5]/30 rounded-xl text-xs font-mono text-slate-600 hover:text-[#009BF5] transition-all cursor-pointer bg-slate-50"
              >
                Sign In
              </button>
            )}
            
            <button
              onClick={() => onLaunchApp('dashboard')}
              className="px-5 py-2.5 bg-gradient-to-r from-[#009BF5] to-[#1A3B8B] hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Launch Pilot</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section with Wave & Organic Blue Aesthetic */}
      <section className="relative bg-[#0A1128] text-white pt-16 pb-36 px-6 overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#009BF5]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            
            <div className="inline-flex items-center gap-2 bg-[#009BF5]/10 border border-[#009BF5]/30 px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles className="h-3.5 w-3.5 text-[#009BF5] animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase text-[#009BF5] tracking-wider">—— Best Academic Agent</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Get Your Campus <br />
              <span className="bg-gradient-to-r from-[#009BF5] to-blue-400 bg-clip-text text-transparent">Under Control</span> <br />
              With AI Solutions
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              CampusPilot automates university logistics. Upload study PDFs or timetables, sync classes directly to your calendar, scan for scholarships, and consult Gemma for curriculum queries.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle className="h-4 w-4 text-[#009BF5]" />
                <span>Instant PDF timetable parsing & calendar extraction</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle className="h-4 w-4 text-[#009BF5]" />
                <span>Automatic examination conflict & density check alerts</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-200">
                <CheckCircle className="h-4 w-4 text-[#009BF5]" />
                <span>Tailored scholarship & funding matching engine</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
              <button
                onClick={() => onLaunchApp('documents')}
                className="px-6 py-3.5 bg-[#009BF5] hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                <UploadCloud className="h-4.5 w-4.5" />
                <span>Upload Timetable</span>
              </button>

              <button
                onClick={() => onLaunchApp('dashboard')}
                className="px-6 py-3.5 border border-slate-700 hover:border-[#009BF5] bg-slate-900/40 hover:bg-[#009BF5]/10 text-gray-200 hover:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Hero Right Visual mockup with organic shape */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] w-full mt-8 lg:mt-0">
            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[48px] overflow-hidden border-[12px] border-slate-800/80 shadow-2xl group">
              <img 
                src="/assets/campus_pilot_mockup.jpg" 
                alt="CampusPilot Dashboard Mockup" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlapping fluid frame background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1128]/45 via-transparent to-[#009BF5]/10 pointer-events-none" />
              
              {/* Glowing play overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => onLaunchApp('dashboard')}
                  className="h-16 w-16 bg-[#009BF5] hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer border-4 border-white/20"
                >
                  <Play className="h-6 w-6 fill-current translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Wave bottom divider SVG */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto text-slate-50 relative top-[1px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 32L60 42.7C120 53 240 75 360 74.7C480 75 600 53 720 48C840 43 960 53 1080 58.7C1200 64 1320 64 1380 64L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V32Z" fill="currentColor"></path>
          </svg>
        </div>

      </section>

      {/* Brands Trust Line (Universities Partner Section) */}
      <section className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-extrabold block mb-5">
            SUPPORTING STUDENTS FROM GLOBAL INSTITUTIONS
          </span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all select-none">
            <div className="text-xl font-bold font-serif text-slate-600 tracking-tight">Stanford University</div>
            <div className="text-xl font-bold font-sans text-slate-600 tracking-tight">MIT</div>
            <div className="text-xl font-bold font-mono text-slate-600 tracking-widest">OXFORD</div>
            <div className="text-xl font-bold font-serif text-slate-600 tracking-wide">University of Embu</div>
            <div className="text-xl font-bold font-sans text-slate-600 tracking-wider">Cordillera School</div>
          </div>
        </div>
      </section>

      {/* "We Solve Academic Logistics" Services Block */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 text-center">
        
        <div className="max-w-2xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#009BF5] font-black">WHAT WE DO</span>
          <h3 className="text-3xl md:text-4xl font-black text-[#0A1128] font-sans">
            We Solve Academic Logistics <br />With Smart Agent Technology
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            Managing classes, exams, grades, and study plans is fully automated. Let CampusPilot sync schedules and surface insights instantly.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Card 1: Calendar Sync */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="bg-[#009BF5]/10 text-[#009BF5] p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-6 w-6" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A1128] mb-2 font-sans">Calendar Sync</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Snap or upload a PDF of your timetable. Gemma extracts and syncs all lectures directly to your device calendar.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('schedule')}
              className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-[#009BF5] hover:text-indigo-700 transition-colors w-fit cursor-pointer group/btn"
            >
              <span>Explore Schedule</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: AI Study Plans */}
          <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-purple-500/20 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="bg-purple-50 text-purple-600 p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A1128] mb-2 font-sans">AI Study Plans</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Gemma parses the syllabus to build customized review blocks, optimizing your prep times around key exams.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('planner')}
              className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-purple-600 hover:text-purple-800 transition-colors w-fit cursor-pointer group/btn"
            >
              <span>Explore Planner</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Funding Discovery */}
          <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-emerald-500/20 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A1128] mb-2 font-sans">Scholarships</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Matched automatically. We crawl grant opportunities based on your specific academic transcripts.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('scholarships')}
              className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-800 transition-colors w-fit cursor-pointer group/btn"
            >
              <span>Discover Grants</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 4: AI Assistant */}
          <div className="bg-white border border-slate-150 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:border-blue-500/20 transition-all duration-300 group flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl w-fit mb-5 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h4 className="text-base font-extrabold text-[#0A1128] mb-2 font-sans">Syllabus Query</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Interact with your course guidelines. Gemma answers questions directly regarding assignments and grades.
              </p>
            </div>
            <button 
              onClick={() => onLaunchApp('ai-workspace')}
              className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors w-fit cursor-pointer group/btn"
            >
              <span>Ask Co-pilot</span>
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </section>

      {/* Stay Connected Banner Section */}
      <section className="bg-gradient-to-r from-[#009BF5] to-[#1A3B8B] text-white py-12 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 bg-white/10 rounded-2xl border border-white/20 hidden sm:block">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-85 block">GET IN TOUCH</span>
              <h4 className="text-xl md:text-2xl font-black font-sans leading-none">Stay Connected With CampusPilot</h4>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-lg md:text-xl font-mono font-black">+1 (206) 555-0112</span>
            <button 
              onClick={() => onLaunchApp('dashboard')}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#009BF5]" />
            </button>
          </div>
        </div>
      </section>

      {/* Standard Academic Process (Horizontal Timeline) */}
      <section id="how-it-works" className="bg-slate-50 border-y border-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          
          <div className="max-w-xl mx-auto mb-16 flex flex-col gap-2">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#009BF5] font-black">HOW IT WORKS</span>
            <h3 className="text-3xl font-black text-[#0A1128] font-sans">Standard Academic Process</h3>
            <p className="text-xs text-slate-500 mt-1">
              Four structured phases to configure and deploy your autonomous academic planning agent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="h-16 w-16 bg-white border-2 border-slate-200 group-hover:border-[#009BF5] text-[#009BF5] text-xl font-black rounded-full flex items-center justify-center shadow-sm relative z-10 transition-colors duration-300">
                1
              </div>
              <h4 className="text-sm font-extrabold text-[#0A1128] font-sans mt-4 mb-2">Upload Timetable</h4>
              <p className="text-[11px] text-slate-500 max-w-[180px] leading-relaxed">
                Snap a photo or upload a PDF of your timetable document.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="h-16 w-16 bg-white border-2 border-slate-200 group-hover:border-[#009BF5] text-[#009BF5] text-xl font-black rounded-full flex items-center justify-center shadow-sm relative z-10 transition-colors duration-300">
                2
              </div>
              <h4 className="text-sm font-extrabold text-[#0A1128] font-sans mt-4 mb-2">Define Requirements</h4>
              <p className="text-[11px] text-slate-500 max-w-[180px] leading-relaxed">
                Set course options, exams, and target grade goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="h-16 w-16 bg-white border-2 border-slate-200 group-hover:border-[#009BF5] text-[#009BF5] text-xl font-black rounded-full flex items-center justify-center shadow-sm relative z-10 transition-colors duration-300">
                3
              </div>
              <h4 className="text-sm font-extrabold text-[#0A1128] font-sans mt-4 mb-2">Agent Syncing</h4>
              <p className="text-[11px] text-slate-500 max-w-[180px] leading-relaxed">
                Gemma processes data and schedules classes automatically.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative group">
              <div className="h-16 w-16 bg-white border-2 border-slate-200 group-hover:border-[#009BF5] text-[#009BF5] text-xl font-black rounded-full flex items-center justify-center shadow-sm relative z-10 transition-colors duration-300">
                4
              </div>
              <h4 className="text-sm font-extrabold text-[#0A1128] font-sans mt-4 mb-2">Launch Dashboard</h4>
              <p className="text-[11px] text-slate-500 max-w-[180px] leading-relaxed">
                Explore synced calendar maps, GPA metrics, and AI chat.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Stat Counter Banner Section */}
      <section id="stats" className="relative bg-[#0A1128] text-white py-16 px-6 overflow-hidden">
        
        {/* Background glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#009BF5_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-4 text-left space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#009BF5] font-black">ACHIEVEMENT</span>
            <h3 className="text-3xl font-black font-sans leading-tight">Increasing Student Academic Success</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our autonomous scheduling and optimization system reduces administrative load by 90%, empowering you to focus entirely on learning.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h4 className="text-3xl font-black font-mono text-[#009BF5] mb-1">100%</h4>
              <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Extraction Rate</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h4 className="text-3xl font-black font-mono text-white mb-1">6,561+</h4>
              <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Synced Courses</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h4 className="text-3xl font-black font-mono text-white mb-1">250+</h4>
              <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Scholarships Match</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h4 className="text-3xl font-black font-mono text-[#009BF5] mb-1">1,001+</h4>
              <p className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Academic Hours Saved</p>
            </div>

          </div>

        </div>

      </section>

      {/* Ask anything, know everything interactive widget block */}
      <section id="workspace" className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="bg-white border border-slate-100 rounded-[32px] p-8 md:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[45%] h-[100%] bg-blue-50/20 blur-[80px] pointer-events-none" />

          {/* Text Left */}
          <div className="lg:col-span-6 space-y-6 text-left relative z-10">
            
            <span className="text-[10px] uppercase font-mono tracking-wider bg-blue-50 border border-blue-200 text-blue-600 px-3.5 py-1 rounded-full w-fit font-bold">
              Co-pilot Workspace
            </span>

            <h3 className="text-2xl md:text-3xl font-black text-[#0A1128] font-sans leading-tight">
              Ask anything, know everything.
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Your CampusPilot AI Workspace runs live queries across your parsed lecture notes, homework guidelines, and syllabus definitions. Speak with Gemma to resolve complexity in seconds.
            </p>

            {/* Bullets checklist */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <div className="h-5 w-5 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span>Summarize 50-page research papers in seconds.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <div className="h-5 w-5 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span>Generate flashcards based on lecture recordings.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <div className="h-5 w-5 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-500">
                  <CheckCircle className="h-3.5 w-3.5" />
                </div>
                <span>Draft bibliography citations in any format.</span>
              </div>
            </div>

            <button
              onClick={() => onLaunchApp('ai-workspace')}
              className="px-5 py-2.5 bg-[#009BF5] hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-md shadow-blue-400/20"
            >
              <span>Enter AI Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

          {/* Interactive chat representation Right */}
          <div className="lg:col-span-6 bg-[#0A1128] border border-slate-900 rounded-2xl p-4.5 shadow-2xl h-[300px] flex flex-col justify-between font-mono text-[11px] text-slate-400 relative z-10">
            
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#009BF5] animate-pulse" />
                <span className="text-[9px] uppercase tracking-wider font-bold text-white">Live Workspace Chat</span>
              </div>
              <span className="text-[8px] border border-slate-700 bg-slate-900/60 text-slate-400 px-1.5 py-0.5 rounded">
                Gemma 4 Real-time
              </span>
            </div>

            {/* Chat list mock */}
            <div className="space-y-3 flex-1 overflow-y-auto py-3 pr-1 scrollbar-none">
              <div className="text-right">
                <span className="text-[8px] text-slate-500 block mb-0.5">Alex (Student)</span>
                <span className="inline-block bg-[#009BF5] text-white px-3 py-1.5 rounded-xl rounded-tr-none text-[10px] text-left">
                  Find me CS scholarships in Embu...
                </span>
              </div>
              <div className="text-left">
                <span className="text-[8px] text-[#009BF5] block mb-0.5">Gemma Autonomous Agent</span>
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl rounded-tl-none space-y-1">
                  <div className="flex items-center gap-2 text-[#009BF5] font-bold text-[9px] animate-pulse">
                    <span className="h-1 w-3 bg-[#009BF5] rounded animate-bounce" />
                    <span>LIVE SEARCHING...</span>
                  </div>
                  <p className="text-[9px] text-slate-400">Crawling Embu community databases and international tech funding channels...</p>
                </div>
              </div>
            </div>

            {/* Mock input bottom */}
            <div className="pt-2 border-t border-slate-800 flex gap-2 items-center">
              <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-2 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Ask your co-pilot anything...</span>
                <Search className="h-3 w-3 text-slate-600" />
              </div>
              <div className="bg-[#009BF5] p-2 rounded-xl text-white cursor-pointer hover:bg-blue-600 transition-colors">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Student Review Block */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#009BF5] font-black">TESTIMONIALS</span>
          <div className="max-w-3xl mx-auto bg-white border border-slate-150 p-8 rounded-[32px] shadow-sm relative">
            <span className="text-6xl text-blue-100 font-serif absolute top-4 left-6 select-none">“</span>
            <p className="text-sm md:text-base text-slate-600 italic leading-relaxed relative z-10">
              CampusPilot took the pain out of managing my double major operations. Syncing lectures, finding scholarships matching my Yr 2 CS transcript, and detecting statistics exam conflicts has been a lifesaver.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Maelys Leiva Avatar"
                className="h-10 w-10 rounded-full object-cover border-2 border-[#009BF5]" 
              />
              <div className="text-left">
                <h5 className="text-xs font-extrabold text-[#0A1128]">Maelys Leiva</h5>
                <span className="text-[10px] text-slate-400 font-mono">Computer Science Year 2 Student</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-[#0A1128] text-slate-400 px-6 py-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 text-left">
            <img src="/assets/logo.jpg" alt="CampusPilot Logo" className="h-9 w-9 rounded-xl object-cover border border-white/10" />
            <div>
              <span className="font-extrabold text-white text-sm font-sans tracking-tight">CampusPilot</span>
              <p className="text-[9px] text-slate-500 font-mono">Operations Academic Agent</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-[11px] font-bold">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#workspace" className="hover:text-white transition-colors">AI Workspace</a>
            <a href="#stats" className="hover:text-white transition-colors">Statistics</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[10px]">
          <p>© 2026 CampusPilot AI. Powered by Google Gemma.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#support" className="hover:underline">Support Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
