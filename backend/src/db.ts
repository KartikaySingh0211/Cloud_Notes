import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export const initDB = async () => {
	const dbPath = path.resolve(__dirname, "../db/notes.db");
	const db = await open({
		filename: dbPath,
		driver: sqlite3.Database,
	});

	await db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

	return db;
};
