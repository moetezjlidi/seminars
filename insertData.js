const sqlite3 = require('sqlite3').verbose();
const seminarsData = require('./seminarsData.json'); // Path to your JSON file

const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
    return;
  }
});

seminarsData.forEach(seminar => {
  const { title, presenter, date, description } = seminar;
  db.run('INSERT INTO seminars (title, presenter, date, description) VALUES (?, ?, ?, ?)', [title, presenter, date, description], (err) => {
    if (err) {
      console.error('Error inserting data', err);
    }
  });
});

db.close();
