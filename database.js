const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS seminars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    presenter TEXT,
    date TEXT,
    description TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating table', err);
    } else {
      console.log('Table Seminars created successfully  or already exists.');
    }
  });
});
// Add this to your existing database setup in database.js
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT
)`, err => {
  if (err) {
      console.error('Error creating users table', err);
  }
  else {
    console.log('Table Users created successfully or already exists.');
  }
});


db.close();