import { Sequelize } from "sequelize";
import env from "dotenv";

env.config();

const db = new Sequelize({
    dialect: 'sqlite',
    database: process.env.DB_DATABASE,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default db;