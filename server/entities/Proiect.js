import db from "../database.js";
import { Sequelize } from "sequelize";

const Proiect = db.define("Proiect",{
    ProiectID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NumeProiect:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    Descriere:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    NotaProiect:
    {
        type: DataTypes.DECIMAL(5, 2),
        validate: {
        min: 1,
        max: 10,
        }
    }
    //de implementat JuratID - daca avem un jurat peste tot proiectul
}, {tableName: "Proiect"});

export default Proiect;