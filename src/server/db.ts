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
    name: "Clarryson",
    university: "University of Embu",
    course: "Bachelor of Science in Computer Science",
    department: "Computer Science",
    year: 2,
    semester: 1,
    registrationNumber: "ENG/CS/2024/001"
  },
  documents: [],
  timetable: [],
  exams: [],
  assignments: [],
  projects: [],
  studyPlans: [],
  reminders: [],
  notifications: [],
  gemmaActivities: [],
  calendarEvents: [],
  scholarships: [],
  campusEvents: []
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
