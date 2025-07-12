import { WazeResponse } from "./waze";

export async function init(db: D1Database) {
	const stmt = `CREATE TABLE IF NOT EXISTS waze_events (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		alerts TEXT,
		traffic TEXT,
		users TEXT,
		startTimeMillis INTEGER,
		startTime TIMESTAMP,
		endTimeMillis INTEGER,
		endTime TIMESTAMP
	);`;

	await db.prepare(stmt).run();
}

export async function insert(db: D1Database, data: WazeResponse) {
	const stmt = `INSERT INTO waze_events (alerts, traffic, users, startTimeMillis, startTime, endTimeMillis, endTime)
		VALUES (?, ?, ?, ?, ?, ?, ?)`;

	await db.prepare(stmt).bind(
		JSON.stringify(data.alerts),
		"", "",
		// JSON.stringify(data.traffic),
		// JSON.stringify(data.users),
		data.startTimeMillis,
		data.startTime,
		data.endTimeMillis,
		data.endTime
	).run();
}

