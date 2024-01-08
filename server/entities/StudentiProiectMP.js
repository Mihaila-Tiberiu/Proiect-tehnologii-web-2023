import db from "../database.js";
import { Sequelize } from "sequelize";

const StudentiProiectMP = db.define("StudentiProiectMP", {
    ID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    StudentID:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ProiectID:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {tableName:"StudentiProiectMP"});

export default StudentiProiectMP;