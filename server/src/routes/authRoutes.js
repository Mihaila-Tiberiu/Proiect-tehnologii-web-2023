import express from "express";
import { createStudent } from "../dataAccess/StudentiDA.js";
import { createProfesor } from "../dataAccess/ProfesoriDA.js";

const authRouter = express.Router();

// Route to create a student account
authRouter.route('/createUserStudent').post(async (req, res) => {
        return res.json(await createStudent(req.body));
});

// Route to create a professor account
authRouter.route('/createUserProf').post(async (req, res) => {
    return res.json(await createProfesor(req.body));
});

// Route to login a student
authRouter.post('/loginStudent', (req, res) => {
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
authRouter.post('/loginProf', (req, res) => {
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

export default authRouter;