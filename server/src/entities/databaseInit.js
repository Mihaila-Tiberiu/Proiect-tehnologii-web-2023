import mysql3 from "mysql3";
import env from "dotenv";
import sqlite3  from "sqlite3";
import Livrabil from "./Livrabil.js";
import Profesori from "./Profesori.js";
import Proiect from "./Proiect.js";
import Recenzie from "./Recenzie.js";
import Studenti from "./Studenti.js";
import { open } from 'sqlite';
import { AliasLivrabil, AliasProfesori, AliasProiect, 
        AliasRecenzie, AliasStudenti, AliasStudentiJur, AliasStudentiLivrabil, 
        AliasStudentiProiect } from "./databaseConsts.js";
import db from "../../database.js";

env.config();

async function createDatabase(){
    try {
        const db = await open({
          filename: process.env.DB_DATABASE,
          driver: sqlite3.Database,
        });
        console.log('Database created successfully');
      } catch (err) {
        console.error('Error creating database:', err);
      }
}

function fk_Config(){
      Proiect.hasMany(Livrabil, {as: AliasLivrabil, foreignKey: "ProiectID"}); //un proiect are mai multe livrabile
      Proiect.hasMany(Studenti, {as: AliasStudenti, foreignKey: "ProiectID"});
      Studenti.belongsTo(Proiect, {as: AliasProiect, foreignKey: "ProiectID"});
      Recenzie.belongsTo(Studenti, { as: AliasRecenzie, foreignKey: "StudentID" })  //o recenzie are un student
      Livrabil.hasMany(Recenzie, {as: AliasRecenzie, foreignKey: "LivrabilID"});
      Livrabil.hasMany(Studenti, {as: AliasStudenti, foreignKey: "LivrabilID"});

}

async function db_init() {
  try {
      await createDatabase();
      fk_Config();
      db.sync({ force: false })
  .then(() => {
    console.log('Sequelize synchronization successful');
  })
  .catch((err) => {
    console.error('Sequelize synchronization error:', err);
  });


  } catch (error) {
      console.error('Sequelize synchronization error:', error);
  }
}


export default db_init;