import fs from "fs";
import path from "path";

export interface DocumentRecord {
  id: string;
  name: string;
  type: string; // 'timetable' | 'exam' | 'handbook' | 'assignment' | 'project' | 'unknown'
  uploadedAt: string;
  size: string;
  filePath?: string;    // Absolute path to saved file in uploads/ folder
  parsedText?: string;
  gemmaExtraction?: string;
}

export interface TimetableClass {
  id: string;
  courseCode: string;
  courseName: string;
  day: string; // 'Monday', 'Tuesday', etc.
  startTime: string; // '08:00 AM'
  endTime: string; // '11:00 AM'
  venue: string; // 'Lecture Hall B'
  building: string; // 'Science Complex'
  lecturer: string; // 'Dr. Kamau'
  version: number;
}

export interface ExamEvent {
  id: string;
  courseCode: string;
  courseName: string;
  date: string; // '2026-12-08'
  time: string; // '09:00 AM'
  duration: string; // '3 Hours'
  venue: string; // 'Graduation Pavilion'
}

export interface AssignmentRecord {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  deadline: string; // '2026-12-01'
  details: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

export interface ProjectRecord {
  id: string;
  courseCode: string;
  title: string;
  deadline: string;
  details: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

export interface StudyPlanItem {
  id: string;
  day: string;
  timeBlock: string; // '18:00 - 20:00'
  courseCode: string;
  focusArea: string;
  intensity: string;
}

export interface ReminderItem {
  id: string;
  title: string;
  dateTime: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  timestamp: string;
  read: boolean;
}

export interface GemmaActivityLog {
  id: string;
  timestamp: string;
  category: string; // 'Timetable' | 'Exam' | 'Study Plan' | 'Calendar' | 'Scholarship' | 'Alert' | 'System'
  message: string;
  reasoning: string; // Detailed Gemma thoughts
}

export interface CalendarEventItem {
  id: string;
  title: string;
  startTime: string; // ISO string or simple time
  endTime: string;
  location: string;
  description: string;
  source: 'timetable' | 'exam' | 'manual';
  gemmaSynced: boolean;
}

export interface ScholarshipItem {
  id: string;
  title: string;
  amount: string;
  deadline: string;
  eligibility: string;
  provider: string;
}

export interface CampusEventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface DailyBriefing {
  date: string;
  classes: TimetableClass[];
  assignments: AssignmentRecord[];
  exams: ExamEvent[];
  studyTimeRecommendation: string;
  motivationQuote: string;
  weatherPlaceholder: string;
  gemmaAssessment: string;
}

export interface StudentProfile {
  name: string;
  university: string;
  course: string;
  department: string;
  year: number;
  semester: number;
  registrationNumber: string;
}

export interface DBState {
  studentProfile: StudentProfile;
  documents: DocumentRecord[];
  timetable: TimetableClass[];
  exams: ExamEvent[];
  assignments: AssignmentRecord[];
  projects: ProjectRecord[];
  studyPlans: StudyPlanItem[];
  reminders: ReminderItem[];
  notifications: NotificationItem[];
  gemmaActivities: GemmaActivityLog[];
  calendarEvents: CalendarEventItem[];
  scholarships: ScholarshipItem[];
  campusEvents: CampusEventItem[];
}

const DB_FILE = path.join(process.cwd(), "database.json");

const INITIAL_STATE: DBState = {
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
      courseCode: "CSC 214",
      courseName: "Discrete Structures",
      day: "Thursday",
      startTime: "08:00 AM",
      endTime: "11:00 AM",
      venue: "Pavilion Room 1",
      building: "Graduation Pavilion",
      lecturer: "Mr. James Mwangi",
      version: 1
    },
    {
      id: "t-5",
      courseCode: "SMA 201",
      courseName: "Calculus III",
      day: "Friday",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      venue: "Lecture Hall B",
      building: "Science Complex",
      lecturer: "Dr. David Njoroge",
      version: 1
    }
  ],
  exams: [
    {
      id: "e-1",
      courseCode: "CSC 211",
      courseName: "Data Structures and Algorithms Exam",
      date: "2026-12-08",
      time: "09:00 AM",
      duration: "3 Hours",
      venue: "Graduation Pavilion"
    },
    {
      id: "e-2",
      courseCode: "CSC 213",
      courseName: "Database Management Systems Exam",
      date: "2026-12-10",
      time: "02:00 PM",
      duration: "3 Hours",
      venue: "Science Lab 1"
    },
    {
      id: "e-3",
      courseCode: "SMA 201",
      courseName: "Calculus III Exam",
      date: "2026-12-12",
      time: "09:00 AM",
      duration: "3 Hours",
      venue: "Graduation Pavilion"
    }
  ],
  assignments: [
    {
      id: "a-1",
      courseCode: "CSC 211",
      courseName: "Data Structures and Algorithms",
      title: "AVL & Red-Black Tree Complex Benchmark Implementation",
      deadline: "2026-12-01",
      details: "Implement complete tree rotations, insertion, deletion, and analyze clock-time performance relative to tree depth. Submit zipped Java project.",
      priority: "high",
      status: "pending"
    },
    {
      id: "a-2",
      courseCode: "CSC 213",
      courseName: "Database Management Systems",
      title: "Normal Form Normalization Clinic System Case Study",
      deadline: "2026-11-25",
      details: "Decompose a flat clinic registration table into 1NF, 2NF, 3NF, and BCNF structures. Include multi-valued dependencies.",
      priority: "medium",
      status: "in_progress"
    }
  ],
  projects: [
    {
      id: "p-1",
      courseCode: "CSC 212",
      title: "Multi-threaded Enterprise Socket Server and Client",
      deadline: "2026-11-15",
      details: "Build a socket chat server capable of handling concurrent clients, maintaining logs, and utilizing thread-pools. Must demonstrate clean OOP design patterns.",
      priority: "high",
      status: "pending"
    }
  ],
  studyPlans: [
    {
      id: "s-1",
      day: "Monday",
      timeBlock: "06:00 PM - 08:00 PM",
      courseCode: "CSC 211",
      focusArea: "Review Data Structures: Heap Tree and AVL Rotations",
      intensity: "Intensive"
    },
    {
      id: "s-2",
      day: "Tuesday",
      timeBlock: "07:00 PM - 09:00 PM",
      courseCode: "CSC 212",
      focusArea: "Code socket server multi-threading locks",
      intensity: "Intensive"
    },
    {
      id: "s-3",
      day: "Wednesday",
      timeBlock: "06:00 PM - 08:00 PM",
      courseCode: "CSC 213",
      focusArea: "Practice Boyce-Codd Normal Form decomposition rules",
      intensity: "Medium"
    },
    {
      id: "s-4",
      day: "Thursday",
      timeBlock: "06:00 PM - 08:00 PM",
      courseCode: "CSC 214",
      focusArea: "Solve discrete proofs and proposition matrices",
      intensity: "Medium"
    },
    {
      id: "s-5",
      day: "Friday",
      timeBlock: "07:00 PM - 08:30 PM",
      courseCode: "SMA 201",
      focusArea: "Calculus multi-variable integration homework",
      intensity: "Medium"
    }
  ],
  reminders: [
    {
      id: "rem-1",
      title: "Revise Discrete Mathematics structural induction proofs",
      dateTime: "2026-07-20T17:00:00.000Z",
      priority: "medium",
      completed: false,
      createdAt: "2026-07-16T08:10:00.000Z"
    },
    {
      id: "rem-2",
      title: "Prepare DBMS team normal form presentation outline",
      dateTime: "2026-07-18T14:00:00.000Z",
      priority: "high",
      completed: false,
      createdAt: "2026-07-16T08:12:00.000Z"
    }
  ],
  notifications: [
    {
      id: "n-1",
      message: "Gemma auto-detected class and exam schedules. Pre-populated 5 university modules successfully.",
      type: "success",
      timestamp: "2026-07-16T08:06:00.000Z",
      read: false
    },
    {
      id: "n-2",
      message: "Warning: High-priority assignment 'AVL & Red-Black Tree' has been prioritized by Gemma. Added to your study focus.",
      type: "warning",
      timestamp: "2026-07-16T08:15:00.000Z",
      read: false
    }
  ],
  gemmaActivities: [
    {
      id: "act-1",
      timestamp: "2026-07-16T08:00:00.000Z",
      category: "Timetable",
      message: "Class Timetable PDF analyzed and structured.",
      reasoning: "I analyzed the file 'Class_Timetable_v1.pdf'. Determined that the curriculum matches 'Computer Science Year 2 Semester 1' of the university schedule. Extracted 5 distinct lecture schedules: CSC 211, CSC 212, CSC 213, CSC 214, SMA 201. Assigned correct classrooms in Tech Block and Science Complex. Established Lecture Hall B as the primary lecture location."
    },
    {
      id: "act-2",
      timestamp: "2026-07-16T08:05:00.000Z",
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

export class Database {
  private static state: DBState = INITIAL_STATE;

  static init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, "utf-8");
        Database.state = JSON.parse(fileContent);
        console.log("Database initialized from disk.");
      } else {
        Database.save();
        console.log("Database file created and preloaded with default state.");
      }
    } catch (e) {
      console.error("Failed to read database from disk, using in-memory state:", e);
    }
  }

  static get(): DBState {
    return Database.state;
  }

  static save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(Database.state, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to write database to disk:", e);
    }
  }

  static update(updater: (state: DBState) => void) {
    updater(Database.state);
    Database.save();
  }

  static reset() {
    Database.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    Database.save();
    console.log("Database reset to initial demo state.");
  }
}

// Initialize database
Database.init();
