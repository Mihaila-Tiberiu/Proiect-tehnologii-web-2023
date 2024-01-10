import db from "../../database.js";
import { Sequelize } from "sequelize";

const Livrabil = db.define("Livrabil",{
    LivrabilID:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ProiectID:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    NumeLivrabil:
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    VideoDemonstrativ:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    LinkServer:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    Deadline:
    {
        type: Sequelize.STRING,
        allowNull: true
    },
    StudentID:
    {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {tableName:"Livrabil"});

export default Livrabil;