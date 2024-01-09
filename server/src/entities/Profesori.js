import db from "../../database.js";
import { Sequelize } from "sequelize";

const Profesori = db.define("Profesori", {
    ProfesorID:
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
    }
}, {tableName: "Profesori"});

export default Profesori;
