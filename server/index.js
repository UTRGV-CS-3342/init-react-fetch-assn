// The API server: JSON in, JSON out, no pages. The site itself is the react-router
// app in ../client, served separately on port 8080.
// Run this in its own terminal: `cd server`, then `npm run dev`.

import express from 'express';
import cors from 'cors';
import { getCourses, getSections, getInstructors, addSection, updateSection, deleteSection } from './db.js';

const PORT = 3000;

// simulate a slow network/server so loading and pending states are visible during development
const FAKE_LATENCY_MS = 2000;

const app = express();

// The browser app comes from a different origin (port 8080), so the browser won't let it
// read our replies unless we say it may. A JSON POST also sends a "preflight" OPTIONS request
// first to ask permission; cors() answers that here, before the fake latency below.
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());
app.use((req, res, next) => setTimeout(next, FAKE_LATENCY_MS));

// everything the schedule page shows, in one request
app.get('/api/schedule', (req, res) => {
	res.json({ courses: getCourses(), sections: getSections(), instructors: getInstructors() });
});

app.post('/api/sections/add', (req, res) => {
	const { course_id, instructor_id } = req.body;

	const section = addSection(parseInt(course_id), parseInt(instructor_id));
	if (!section) return res.status(404).json({ errors: ['No such course or instructor.'] });
	res.status(201).json({ section });
});

app.post('/api/sections/update', (req, res) => {
	const { section_id, instructor_id } = req.body;

	if (!updateSection(parseInt(section_id), parseInt(instructor_id))) {
		return res.status(404).json({ errors: ['No such section or instructor.'] });
	}
	res.json({ ok: true });
});

app.post('/api/sections/delete', (req, res) => {
	const { section_id } = req.body;

	if (!deleteSection(parseInt(section_id))) {
		return res.status(404).json({ errors: ['No such section.'] });
	}
	res.json({ ok: true });
});

app.listen(PORT, () => console.log(`API server on http://localhost:${PORT}`));
