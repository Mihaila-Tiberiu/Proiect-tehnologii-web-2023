import express from "express";
import { createProiect, getProiecte } from "../dataAccess/ProiectDA.js";

const studentRouter = express.Router();

// Route to create a new project
studentRouter.route('/createProject').post(async (req, res) => {
    return res.json(await createProiect(req.body));
});

studentRouter.route('/allProjects').get(async (req, res) => {
    return res.json(await getProiecte());
})

// // Route to join an existing project
studentRouter.post('/joinProject', (req, res) => {
  // Logic to join an existing project
});

// // Route to edit project details
// router.put('/editProject/:projectId', (req, res) => {
//   // Logic to edit project details
// });

// // Route to add deliverables to a project
// router.post('/addDeliverable/:projectId', (req, res) => {
//   // Logic to add deliverables to a project
// });

// // Route to edit deliverable details
// router.put('/editDeliverable/:deliverableId', (req, res) => {
//   // Logic to edit deliverable details
// });

// // Route to add personal review
// router.post('/addOwnReview/:projectId', (req, res) => {
//   // Logic to add personal review
// });

export default studentRouter
