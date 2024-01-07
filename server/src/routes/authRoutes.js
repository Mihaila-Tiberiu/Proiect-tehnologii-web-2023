// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open the SQLite database
const db = new sqlite3.Database('database.db');

// Route to create a student account
router.post('/createUserStudent', (req, res) => {
  const { Nume, Prenume, Parola } = req.body;
  db.run(
    'INSERT INTO Studenti (Nume, Prenume, Parola) VALUES (?, ?, ?)',
    [Nume, Prenume, Parola],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create student account', error: err.message });
      }
      return res.status(200).json({ message: 'Student account created successfully' });
    }
  );
});

// Route to create a professor account
router.post('/createUserProf', (req, res) => {
  const { Nume, Prenume, Parola } = req.body;
  db.run(
    'INSERT INTO Profesori (Nume, Prenume, Parola) VALUES (?, ?, ?)',
    [Nume, Prenume, Parola],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create professor account', error: err.message });
      }
      return res.status(200).json({ message: 'Professor account created successfully' });
    }
  );
});

// Route to login a student
router.post('/loginStudent', (req, res) => {
  const { StudentID, Nume, Prenume, Parola } = req.body;
  db.get(
    'SELECT * FROM Studenti WHERE StudentID = ? AND Nume = ? AND Prenume = ? AND Parola = ?',
    [StudentID, Nume, Prenume, Parola],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log in student' });
      }
      if (!row) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Student logged in successfully' });
    }
  );
});

// Route to login a professor
router.post('/loginProf', (req, res) => {
  const { ProfesorID, Nume, Prenume, Parola } = req.body;
  db.get(
    'SELECT * FROM Profesori WHERE ProfesorID = ? AND Nume = ? AND Prenume = ? AND Parola = ?',
    [ProfesorID, Nume, Prenume, Parola],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log in professor', error: err.message });
      }
      if (!row) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Professor logged in successfully' });
    }
  );
});

module.exports = router;
