const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Get Questions by Category and Difficulty
app.get('/api/questions', (req, res) => {
    const { category, difficulty } = req.query;
    let query = 'SELECT * FROM questions';
    const params = [];

    if (category && difficulty) {
        query += ' WHERE category = ? AND difficulty = ?';
        params.push(category, difficulty);
    } else if (category) {
        query += ' WHERE category = ?';
        params.push(category);
    }

    query += ' ORDER BY RANDOM() LIMIT 10';

    const questions = db.prepare(query).all(...params);
    res.json(questions.map(q => ({
        ...q,
        options: JSON.parse(q.options)
    })));
});

// Submit Score
app.post('/api/scores', (req, res) => {
    const { username, score, level, accuracy } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    const info = db.prepare('INSERT INTO scores (username, score, level, accuracy) VALUES (?, ?, ?, ?)')
        .run(username, score, level, accuracy);

    res.json({ id: info.lastInsertRowid, message: 'Score saved' });
});

// Get Leaderboard
app.get('/api/leaderboard', (req, res) => {
    const leaderboard = db.prepare('SELECT username, MAX(score) as highscore, MAX(accuracy) as best_accuracy FROM scores GROUP BY username ORDER BY highscore DESC LIMIT 10').all();
    res.json(leaderboard);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
