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
    },
    esteJurat:{
        type: Sequelize.INTEGER, //1 - este jurat 0 - nu este
        defaultValue: 0
    },
    esteSef:{
        type:Sequelize.INTEGER, //1 - este jurat 0 - nu este
        defaultValue: 0
    }
}, {tableName: "Studenti"});

export default Studenti;