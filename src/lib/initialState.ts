export * from "../types.js";
import { DBState } from "../types.js";

export const INITIAL_STATE: DBState = {
  studentProfile: {
    name: "Alex Rivera",
    university: "State University of Technology",
    course: "Bachelor of Science in Computer Science",
    department: "Computer Science & Engineering",
    year: 2,
    semester: 1,
    registrationNumber: "CS/2026/0142"
  },
  documents: [
    {
      id: "doc-1",
      name: "Class_Timetable_v1.pdf",
      type: "timetable",
      uploadedAt: "2026-07-16T08:00:00.000Z",
      size: "142 KB",
      gemmaExtraction: "Extracted 5 regular courses and timings for State University of Technology."
    },
    {
      id: "doc-2",
      name: "Exam_Timetable_v1.pdf",
      type: "exam",
      uploadedAt: "2026-07-16T08:05:00.000Z",
      size: "95 KB",
      gemmaExtraction: "Extracted 3 exam schedules scheduled in early December."
    }
  ],
  timetable: [
    {
      id: "t-1",
      courseCode: "CSC 211",
      courseName: "Data Structures and Algorithms",
      day: "Monday",
      startTime: "08:00 AM",
      endTime: "11:00 AM",
      venue: "Lecture Hall B",
      building: "Science Complex",
      lecturer: "Dr. John Kamau",
      version: 1
    },
    {
      id: "t-2",
      courseCode: "CSC 212",
      courseName: "Object Oriented Programming II",
      day: "Tuesday",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      venue: "Computer Lab 2",
      building: "Tech Block",
      lecturer: "Prof. Mary Wambui",
      version: 1
    },
    {
      id: "t-3",
      courseCode: "CSC 213",
      courseName: "Database Management Systems",
      day: "Wednesday",
      startTime: "11:00 AM",
      endTime: "02:00 PM",
      venue: "Lecture Hall A",
      building: "Science Complex",
      lecturer: "Dr. Agnes Mutua",
      version: 1
    },
    {
      id: "t-4",
      courseCode: "SMA 201",
      courseName: "Linear Algebra I",
      day: "Thursday",
      startTime: "08:00 AM",
      endTime: "10:00 AM",
      venue: "Room 104",
      building: "Humanities Building",
      lecturer: "Dr. Peter Ochieng",
      version: 1
    },
    {
      id: "t-5",
      courseCode: "CSC 214",
      courseName: "Computer Networks and Telecommunications",
      day: "Friday",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      venue: "Network Lab 1",
      building: "Tech Block",
      lecturer: "Mr. David Odhiambo",
      version: 1
    }
  ],
  exams: [
    {
      id: "e-1",
      courseCode: "CSC 211",
      courseName: "Data Structures and Algorithms",
      date: "2026-12-08",
      time: "09:00 AM",
      duration: "3 Hours",
      venue: "Graduation Pavilion"
    },
    {
      id: "e-2",
      courseCode: "CSC 213",
      courseName: "Database Management Systems",
      date: "2026-12-10",
      time: "02:00 PM",
      duration: "3 Hours",
      venue: "Graduation Pavilion"
    },
    {
      id: "e-3",
      courseCode: "SMA 201",
      courseName: "Linear Algebra I",
      date: "2026-12-12",
      time: "09:00 AM",
      duration: "2 Hours",
      venue: "Main Hall A"
    }
  ],
  assignments: [
    {
      id: "a-1",
      courseCode: "CSC 211",
      courseName: "Data Structures and Algorithms",
      title: "Implement Red-Black Tree in C++",
      deadline: "2026-12-01",
      details: "Full implementation including insertion, deletion, and balancing rotations.",
      priority: "high",
      status: "in_progress"
    },
    {
      id: "a-2",
      courseCode: "CSC 213",
      courseName: "Database Management Systems",
      title: "ER Diagram and BCNF Normalization Project",
      deadline: "2026-11-28",
      details: "Design a complete hospital management system database schema normalized up to BCNF.",
      priority: "medium",
      status: "pending"
    },
    {
      id: "a-3",
      courseCode: "CSC 212",
      courseName: "Object Oriented Programming II",
      title: "Java Swing GUI Banking Application",
      deadline: "2026-11-25",
      details: "Implement multi-threaded transaction handling with GUI and file persistence.",
      priority: "high",
      status: "pending"
    }
  ],
  projects: [
    {
      id: "proj-1",
      courseCode: "CSC 212",
      title: "Semester Capstone: Autonomous Academic OS",
      deadline: "2026-12-05",
      details: "Build a responsive web platform with agentic AI integration for schedule and task optimization.",
      priority: "high",
      status: "in_progress"
    }
  ],
  studyPlans: [
    {
      id: "sp-1",
      day: "Monday",
      timeBlock: "18:00 - 20:00",
      courseCode: "CSC 211",
      focusArea: "Review AVL & Red-Black Tree rotation complexity",
      intensity: "high"
    },
    {
      id: "sp-2",
      day: "Tuesday",
      timeBlock: "19:00 - 21:00",
      courseCode: "CSC 212",
      focusArea: "Practice multi-threaded synchronization & deadlock prevention",
      intensity: "medium"
    },
    {
      id: "sp-3",
      day: "Wednesday",
      timeBlock: "18:00 - 20:00",
      courseCode: "CSC 213",
      focusArea: "Relational algebra queries & SQL transaction isolation levels",
      intensity: "high"
    },
    {
      id: "sp-4",
      day: "Thursday",
      timeBlock: "18:30 - 20:00",
      courseCode: "SMA 201",
      focusArea: "Eigenvalues, eigenvectors, and vector space transformations",
      intensity: "medium"
    },
    {
      id: "sp-5",
      day: "Friday",
      timeBlock: "16:00 - 18:00",
      courseCode: "CSC 214",
      focusArea: "OSI 7-Layer Model & TCP/IP handshake mechanisms",
      intensity: "low"
    }
  ],
  reminders: [
    {
      id: "rem-1",
      title: "Submit Red-Black tree assignment code to GitHub repo",
      dateTime: "2026-12-01T23:59:00.000Z",
      priority: "high",
      completed: false,
      createdAt: "2026-07-16T08:00:00.000Z"
    },
    {
      id: "rem-2",
      title: "Attend GDSC technical workshop in Student Center",
      dateTime: "2026-10-05T16:00:00.000Z",
      priority: "medium",
      completed: false,
      createdAt: "2026-07-16T08:00:00.000Z"
    }
  ],
  notifications: [
    {
      id: "notif-1",
      message: "Gemma 4 has detected and flagged an exam density conflict between CSC 211 and CSC 213.",
      type: "alert",
      timestamp: "2026-07-16T08:06:00.000Z",
      read: false
    },
    {
      id: "notif-2",
      message: "Autonomous Study Plan generated based on your 10-hour weekly study goal.",
      type: "success",
      timestamp: "2026-07-16T08:10:00.000Z",
      read: false
    },
    {
      id: "notif-3",
      message: "Google Calendar sync is ready. Click connect to sync class schedules automatically.",
      type: "info",
      timestamp: "2026-07-16T08:12:00.000Z",
      read: true
    }
  ],
  gemmaActivities: [
    {
      id: "act-1",
      timestamp: "2026-07-16T08:00:05.000Z",
      category: "Timetable",
      message: "Analyzed and indexed Class_Timetable_v1.pdf.",
      reasoning: "Parsed Class_Timetable_v1.pdf using layout-aware ingestion. Extracted 5 core courses (CSC 211, CSC 212, CSC 213, SMA 201, CSC 214). Mapped venues across Science Complex and Tech Block. Verified zero overlapping time blocks."
    },
    {
      id: "act-2",
      timestamp: "2026-07-16T08:06:00.000Z",
      category: "Exam",
      message: "Exam Timetable PDF processed.",
      reasoning: "Extracted final exam timetable from 'Exam_Timetable_v1.pdf'. Identified 3 exams commencing Dec 8, Dec 10, and Dec 12. Marked CSC 211 and SMA 201 as high-density exams scheduled in the Graduation Pavilion. Assessed spacing: Only 1 day of gap exists between CSC 211 and CSC 213. Triggered early-alert planning sequence."
    },
    {
      id: "act-3",
      timestamp: "2026-07-16T08:10:00.000Z",
      category: "Study Plan",
      message: "Autonomous study schedule generated.",
      reasoning: "I assessed the upcoming deadlines and exam density. Formulated a 5-day balanced study plan. Prescribed 10 hours of active weekly study. Allocated Monday evening to CSC 211 (AVL & Red-Black tree complexity) because it is a critical skill gap, and Tuesday evening to CSC 212 multi-threaded logic."
    },
    {
      id: "act-4",
      timestamp: "2026-07-16T08:15:00.000Z",
      category: "Scholarship",
      message: "Scanned academic bulletin: matches found.",
      reasoning: "I scanned the university's academic bulletin for scholarships. Identified 'Google Generation Scholarship (EMEA)' matching Computer Science students in Year 2. Extracted deadline: Dec 15, 2026. Logged recommendation as highly relevant."
    }
  ],
  calendarEvents: [
    {
      id: "c-1",
      title: "CSC 211: Data Structures and Algorithms",
      startTime: "2026-07-20T08:00:00.000Z",
      endTime: "2026-07-20T11:00:00.000Z",
      location: "Lecture Hall B, Science Complex",
      description: "Lecturer: Dr. John Kamau. Extracted from Class_Timetable_v1.pdf",
      source: "timetable",
      gemmaSynced: false
    },
    {
      id: "c-2",
      title: "CSC 212: Object Oriented Programming II",
      startTime: "2026-07-21T14:00:00.000Z",
      endTime: "2026-07-21T17:00:00.000Z",
      location: "Computer Lab 2, Tech Block",
      description: "Lecturer: Prof. Mary Wambui. Extracted from Class_Timetable_v1.pdf",
      source: "timetable",
      gemmaSynced: false
    },
    {
      id: "c-3",
      title: "CSC 213: Database Management Systems",
      startTime: "2026-07-22T11:00:00.000Z",
      endTime: "2026-07-22T14:00:00.000Z",
      location: "Lecture Hall A, Science Complex",
      description: "Lecturer: Dr. Agnes Mutua. Extracted from Class_Timetable_v1.pdf",
      source: "timetable",
      gemmaSynced: false
    }
  ],
  scholarships: [
    {
      id: "scho-1",
      title: "Google Generation Scholarship (EMEA)",
      amount: "€5,000",
      deadline: "2026-12-15",
      eligibility: "Computer Science undergraduate students, Year 2-3, demonstrating academic excellence and passion for technology.",
      provider: "Google"
    },
    {
      id: "scho-2",
      title: "DeepMind Scholarship for Undergraduate Students",
      amount: "$12,000 + Mentorship",
      deadline: "2027-01-10",
      eligibility: "Undergraduate STEM major students enrolled in accredited tech universities. Passionate about AI research.",
      provider: "Google DeepMind"
    },
    {
      id: "scho-3",
      title: "Wings to Fly: Senior STEM Excellence Award",
      amount: "$1,500 / Semester",
      deadline: "2026-10-30",
      eligibility: "Computer Science and Engineering undergraduates with GPA > 3.7",
      provider: "Tech Foundation Group"
    },
    {
      id: "scho-4",
      title: "Higher Education Undergraduate Bursary Scheme",
      amount: "$2,000 / Year",
      deadline: "2026-11-15",
      eligibility: "Undergraduate students demonstrating academic excellence enrolled in accredited public universities.",
      provider: "Higher Education Funding Board"
    },
    {
      id: "scho-5",
      title: "ALX Software Engineering Mentorship & Cohort",
      amount: "Fully Funded (100% Scholarship)",
      deadline: "2026-11-01",
      eligibility: "Tech enthusiasts eager to master front-end and full-stack engineering alongside industry veterans.",
      provider: "ALX / Tech Foundation"
    },
    {
      id: "scho-6",
      title: "Women in Tech Mentorship & Cloud Fellowship",
      amount: "Industry Mentorship & Staged Internships",
      deadline: "2026-10-18",
      eligibility: "Female STEM undergraduates wanting training in Network Engineering and Cloud Computing.",
      provider: "Global Tech Foundation"
    }
  ],
  campusEvents: [
    {
      id: "ce-1",
      title: "Campus Tech Hackathon 2026",
      date: "2026-11-12",
      time: "08:00 AM - 06:00 PM",
      location: "Computer Lab 2, Tech Block",
      description: "Annual hackathon for local developers and university students. Track topics: AI in Agriculture, Mobile Web, FinTech. Organized by GDSC Campus."
    },
    {
      id: "ce-2",
      title: "Google Developer Student Club (GDSC) Onboarding",
      date: "2026-10-05",
      time: "04:00 PM - 06:00 PM",
      location: "Student Center Annex",
      description: "Meet the core team, learn about technology study jams, and hear about global solutions challenge guidelines. Refreshments provided."
    },
    {
      id: "ce-3",
      title: "AI and Machine Learning in Agriculture Seminar",
      date: "2026-10-25",
      time: "10:00 AM - 01:00 PM",
      location: "Graduation Pavilion",
      description: "Special workshop with guest researchers demonstrating crop yield detection using computer vision and lightweight Edge-ML models."
    }
  ]
};
