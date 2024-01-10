import Sequelize  from "sequelize";
import env from "dotenv";

env.config();

const db = new Sequelize({
    dialect: 'sqlite',
    host: process.env.DB_DATABASE, // sa se conecteze la baza pe care o avem
    //Storage: process.env.DB_DATABASE, //ca sa cream o baza de date noua - alt fisier
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});
console.log(process.env.DB_DATABASE);

export default db;