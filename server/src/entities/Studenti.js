import db from "../../database.js";
import { Sequelize } from "sequelize";

const Studenti = db.define("Studenti", {
    StudentID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nume: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Prenume:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Parola:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    ProiectID:
    {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {tableName: "Studenti"});

export default Studenti;