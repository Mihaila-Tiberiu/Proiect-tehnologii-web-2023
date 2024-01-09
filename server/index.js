import express from "express";
import cors from "cors";
import env from "dotenv";
import masterRoute from "./src/routes/masterRoute.js";
import db_init from "./src/entities/databaseInit.js";
import db from "./database.js";
import studentRouter from "./src/routes/studentRoutes.js";

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: 'GET,PUT,PATCH,POST,DELETE'
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));


// ROUTES
// const authRoutes = require('./src/routes/authRoutes.js');
// const studentRoutes = require('./src/routes/studentRoutes.js');
// const juryMemberRoutes = require('./src/routes/juryMemberRoutes.js');
// const professorRoutes = require('./src/routes/professorRoutes.js');
// const { default: router } = require('./src/routes/masterRoute.js');

// // Use the route files
// app.use('/auth', authRoutes);
// app.use('/students', studentRoutes);
// app.use('/jury', juryMemberRoutes);
// app.use('/professors', professorRoutes);

db_init();

app.use('/api', masterRoute);
app.use('/students', studentRouter);

const PORT = process.env.PORT || 8000; // port

app.listen(PORT, () => {
  console.log(`Serverul functioneaza pe port-ul ${PORT}.`);
});
