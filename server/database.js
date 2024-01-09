import Sequelize  from "sequelize";
import env from "dotenv";

env.config();

const db = new Sequelize({
    dialect: 'sqlite',
    host: process.env.DB_DATABASE,
    //Storage: process.env.DB_DATABASE,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});
console.log(process.env.DB_DATABASE);

export default db;

// // Conectare sqlite
// const db = new sqlite3.Database('database.db', (err) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log('Conectat la baza de date sqlite.');
//     }
//   });