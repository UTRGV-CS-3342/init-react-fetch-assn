// The database lives with the API server now: the browser app never touches it.

import Database from 'better-sqlite3';

const db = new Database('schedule.sqlite');

export function getCourses() {
	return db.prepare('SELECT * FROM course').all();
}

export function getSections() {
	return db.prepare('SELECT * FROM section').all();
}

export function getInstructors() {
	return db.prepare('SELECT * FROM instructor').all();
}

// Returns the new section row, or null if the course or instructor doesn't exist
// (the schema has no foreign keys, so nothing else would stop a bad insert).
export function addSection(courseId, instructorId) {
	const course = db.prepare('SELECT id FROM course WHERE id = ?').get(courseId);
	const instructor = db.prepare('SELECT id FROM instructor WHERE id = ?').get(instructorId);
	if (!course || !instructor) return null;

	const { lastInsertRowid } = db
		.prepare('INSERT INTO section (course_id, instructor_id) VALUES (?, ?)')
		.run(courseId, instructorId);
	return db.prepare('SELECT * FROM section WHERE id = ?').get(lastInsertRowid);
}

// Both return false if there was nothing to change.
export function updateSection(sectionId, instructorId) {
	const instructor = db.prepare('SELECT id FROM instructor WHERE id = ?').get(instructorId);
	if (!instructor) return false;
	return db.prepare('UPDATE section SET instructor_id = ? WHERE id = ?').run(instructorId, sectionId).changes > 0;
}

export function deleteSection(sectionId) {
	return db.prepare('DELETE FROM section WHERE id = ?').run(sectionId).changes > 0;
}
