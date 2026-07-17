# CampusPilot AI
> **"Your Autonomous Academic Agent Powered by Gemma 4"**

Welcome to **CampusPilot AI**, a production-grade academic orchestration suite engineered specifically for the Google DeepMind **Build with Gemma Hackathon (Autonomous Agent Track)**.

CampusPilot AI shifts academic management from passive calendar tools to a highly active, fully autonomous AI agent. By placing Gemma 4 as the central reasoning engine of the architecture, students upload documents once and the agent takes over: extracting schedules, comparing timetables, staging calendar syncs, scheduling study blocks, and tracking exam density threats.

---

## 🏆 Selected Track: Autonomous Agent Track
This application is designed specifically around the premise that **no action occurs without Gemma reasoning first**. 
* The frontend never queries databases directly.
* All queries and documents are evaluated by Gemma.
* Gemma determines which database tools/APIs to invoke using native function calling and explains every autonomous action via a readable audit log.

---

## 🗺️ System Architecture Diagram

```
                        +----------------------------------+
                        |          React Frontend          |
                        |      (Immersive Academy UI)      |
                        +-----------------+----------------+
                                          |
                                          | JSON REST API / Uploads
                                          v
                        +-----------------+----------------+
                        |         Express Backend          |
                        |      (Vite Dev Middleware)       |
                        +-----------------+----------------+
                                          |
                                          | Context + Systems Prompts
                                          v
                        +-----------------+----------------+
                        |      Gemma 4 Reasoning Core      |
                        |     (Google Gen AI SDK)          |
                        +-----------------+----------------+
                                          |
                         +----------------+----------------+
                         |  Native Function Calling Loop   |
                         +--------+-------+--------+-------+
                                  |       |        |
        +-------------------------+       |        +------------------------+
        |                                 |                                 |
        v                                 v                                 v
+-------+--------+                +-------+--------+                +-------+--------+
|    Supabase    |                | Google Calendar|                |  Notification  |
| Database Layer |                |  Sync Engine   |                |  Alert Engine  |
+----------------+                +----------------+                +----------------+
```

---

## 🗄️ Database Schema (Supabase/PostgreSQL)

If migrating from the local persistent file database to Supabase or standard PostgreSQL, deploy the following DDL definitions:

```sql
-- Create Enum Types
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed');
CREATE TYPE notif_type AS ENUM ('info', 'warning', 'success', 'alert');

-- 1. Documents Table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'timetable', 'exam', 'handbook', 'assignment'
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    size VARCHAR(50) NOT NULL,
    parsed_text TEXT,
    gemma_extraction TEXT
);

-- 2. Class Timetable Table
CREATE TABLE timetable (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(150) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL, -- 'Monday', 'Tuesday', etc.
    start_time VARCHAR(20) NOT NULL,  -- '08:00 AM'
    end_time VARCHAR(20) NOT NULL,    -- '11:00 AM'
    venue VARCHAR(100) NOT NULL,
    building VARCHAR(100) NOT NULL,
    lecturer VARCHAR(150) NOT NULL,
    version INTEGER DEFAULT 1,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL
);

-- 3. Exam Schedule Table
CREATE TABLE exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(150) NOT NULL,
    exam_date DATE NOT NULL,
    exam_time VARCHAR(20) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    venue VARCHAR(100) NOT NULL
);

-- 4. Coursework Assignments Table
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL,
    details TEXT,
    priority priority_level DEFAULT 'medium',
    status task_status DEFAULT 'pending'
);

-- 5. Gemma Study Plans Table
CREATE TABLE study_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_of_week VARCHAR(20) NOT NULL,
    time_block VARCHAR(50) NOT NULL, -- '18:00 - 20:00'
    course_code VARCHAR(50) NOT NULL,
    focus_area TEXT NOT NULL,
    intensity VARCHAR(50) DEFAULT 'medium'
);

-- 6. Gemma Activities Log (For Audit Dashboard)
CREATE TABLE gemma_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    category VARCHAR(50) NOT NULL, -- 'Timetable', 'Exam', 'Study Plan', 'Calendar'
    message VARCHAR(255) NOT NULL,
    reasoning TEXT NOT NULL
);

-- 7. Google Calendar Synced Events
CREATE TABLE calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    location VARCHAR(255),
    description TEXT,
    source VARCHAR(50) DEFAULT 'timetable',
    gemma_synced BOOLEAN DEFAULT FALSE
);

-- 8. Reminders Table
CREATE TABLE reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    date_time TIMESTAMPTZ NOT NULL,
    priority priority_level DEFAULT 'medium',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. System Notifications Table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    type notif_type DEFAULT 'info',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    read BOOLEAN DEFAULT FALSE
);
```

---

## 🛠️ API Routing Table

| Method | Route | Description | Payload Schema |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/state` | Returns full active academic database | `None` |
| **POST** | `/api/chat` | Main Gemma 4 reasoning & dialogue | `{ prompt: string, history: ChatMessage[] }` |
| **POST** | `/api/documents/upload` | Classifies, parses, and compares PDFs | `{ name: string, base64: string }` |
| **POST** | `/api/calendar/sync` | Executes Google Calendar sync trigger | `None` |
| **POST** | `/api/study-plans/generate` | Generates weekly custom study schedules | `{ intensity: 'light' \| 'medium' \| 'intensive' }` |
| **POST** | `/api/reminders/create` | Autonomously registers custom reminders | `{ title: string, dateTime: string, priority: string }` |
| **POST** | `/api/reminders/toggle` | Toggles checklists completion status | `{ id: string }` |
| **POST** | `/api/notifications/read` | Clears and marks notifications as read | `None` |
| **POST** | `/api/reset` | Resets the database to Demo Initial state | `None` |

---

## ⚙️ Development & Local Launch Setup

Follow these steps to run the CampusPilot AI full-stack suite on your machine:

### 1. Prerequisites
Ensure you have **Node.js v18+** installed on your workstation.

### 2. Set Up Environment Secrets
Create a `.env` file at the project root based on our template:
```env
GEMINI_API_KEY="your-google-ai-studio-api-key"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Workspace
```bash
npm run dev
```
The Express full-stack server starts on **http://localhost:3000** with Vite serving the React client automatically in development middleware mode.

---

## 🚀 Compilation & Deployment Guidelines

CampusPilot AI includes a highly optimized bundler pipeline to package the TypeScript frontend and compiled backend server cleanly.

### 1. Compile for Production
```bash
npm run build
```
This single command executes two steps:
1. Builds the static React SPA inside the `/dist` directory.
2. Compiles `/server.ts` into a standalone, bundled CommonJS `/dist/server.cjs` file using `esbuild` for ultra-fast startup and cold-run containers.

### 2. Deploy to Cloud Run
To host this application in a Docker/Cloud Run environment, use the provided startup command:
```bash
npm run start
```
This boots the production-ready server via `node dist/server.cjs` serving all client assets at peak performance.

---
*Created with Passion for the Google DeepMind Build with Gemma Hackathon 2026.*
