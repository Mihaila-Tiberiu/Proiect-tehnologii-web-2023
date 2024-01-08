import db from "../database.js";
import { Sequelize } from "sequelize";

const Recenzie = db.define("Recenzie",{
    RecenzieID:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    LivrabilID:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    StudentID:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Nota:
    {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 1,
            max: 10,
        }
    },
    ReviewText:
    {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {tableName:"Recenzie"});

export default Recenzie;