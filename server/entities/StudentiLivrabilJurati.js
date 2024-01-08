import db from "../database.js";
import { Sequelize } from "sequelize";

const StudentiLivrabilJurati = db.define("StudentiLivrabilJurati",{
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
    LivrabilID:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {tableName:"StudentiLivrabilJurati"});

export default StudentiLivrabilJurati;