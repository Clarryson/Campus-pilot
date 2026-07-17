export interface DocumentRecord {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  size: string;
  filePath?: string;
  parsedText?: string;
  gemmaExtraction?: string;
}

export interface TimetableClass {
  id: string;
  courseCode: string;
  courseName: string;
  day: string;
  startTime: string;
  endTime: string;
  venue: string;
  building: string;
  lecturer: string;
  version: number;
}

export interface ExamEvent {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
}

export interface AssignmentRecord {
  id: string;
  courseCode: string;
  courseName: string;
  title: string;
  deadline: string;
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
  timeBlock: string;
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
  category: string;
  message: string;
  reasoning: string;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  startTime: string;
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

export interface StudentProfile {
  name: string;
  university: string;
  course: string;
  department: string;
  year: number;
  semester: number;
  registrationNumber: string;
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

export interface DBState {
  studentProfile: StudentProfile;
  documents: DocumentRecord[];
  timetable: TimetableClass[];
  exams: ExamEvent[];
  assignments: AssignmentRecord[];
  projects?: ProjectRecord[];
  studyPlans: StudyPlanItem[];
  reminders: ReminderItem[];
  notifications: NotificationItem[];
  gemmaActivities: GemmaActivityLog[];
  calendarEvents: CalendarEventItem[];
  scholarships: ScholarshipItem[];
  campusEvents: CampusEventItem[];
}
