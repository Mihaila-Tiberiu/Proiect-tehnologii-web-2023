import express from "express";
import cors from "cors";
import masterRoute from "./src/routes/masterRoute.js";
import db_init from "./src/entities/databaseInit.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import authRouter from "./src/routes/authRoutes.js";
import profRouter from "./src/routes/professorRoutes.js";
import juryMemberRoutes from "./src/routes/juryMemberRoutes.js";
import { dailyDatabaseCheck, dailyJuryCheck } from "./src/dataAccess/dailyCheck.js";
import cron from "node-cron";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db_init();
dailyDatabaseCheck();

app.use('/auth', authRouter);
app.use('/jury', juryMemberRoutes);
app.use('/professors', profRouter);
app.use('/api', masterRoute);
app.use('/students', projectRoutes);

const PORT = process.env.PORT || 8080; // port

app.listen(PORT, () => {
  console.log(`Serverul functioneaza pe port-ul ${PORT}.`);
});

//ruleaza functia la o anumita ora din zi
//minut/ ora / zi / * * *
  cron.schedule('15 0 * * *', async () => {
    console.log('Scheduler started.');
    await dailyDatabaseCheck();
    
  });

  //verificam daca sunt jurati care nu au pus nota inainte sa alegem alt set de jurati
  cron.schedule('0 0 * * *', async () => {
    console.log('Scheduler started.');
    await dailyJuryCheck();
  });