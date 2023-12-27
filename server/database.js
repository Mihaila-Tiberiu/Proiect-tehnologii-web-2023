const sqlite3 = require('sqlite3').verbose();

// Conectare sqlite
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Conectat la baza de date sqlite.');
  }
});

module.exports = db;