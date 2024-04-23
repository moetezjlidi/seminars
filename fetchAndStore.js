const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();

async function scrapeData() {
  const { data } = await axios.get('https://lirica.lis-lab.fr/');
  const $ = cheerio.load(data);
  const scrapedData = [];

  // Hypothetical selectors based on your webpage structure
  $('article').each((index, element) => {
    const title = $(element).find('.seminar-title').text();
    const presenter = $(element).find('.seminar-presenter').text();
    const date = $(element).find('.seminar-date').text();
    const description = $(element).find('.seminar-description').text();
    scrapedData.push({ title, presenter, date, description });
  });

  return scrapedData;
}

function insertData(data) {
  const db = new sqlite3.Database('./mydatabase.db'); // Ensure path is correct
  const stmt = db.prepare("INSERT INTO seminars (title, presenter, date, description) VALUES (?, ?, ?, ?)");

  data.forEach(({ title, presenter, date, description }) => {
    stmt.run(title, presenter, date, description);
  });

  stmt.finalize();
  db.close();
}

async function main() {
  const data = await scrapeData();
  insertData(data);
}

main();
