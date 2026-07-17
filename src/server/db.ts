import fs from "fs";
import path from "path";

export * from "../lib/initialState.js";
import { DBState, INITIAL_STATE } from "../lib/initialState.js";

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_FILE = IS_SERVERLESS ? path.join("/tmp", "database.json") : path.join(process.cwd(), "database.json");

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
