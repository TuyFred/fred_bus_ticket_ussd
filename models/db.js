const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bus_ticket.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    seats INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_id INTEGER,
    phone TEXT,
    status TEXT DEFAULT 'booked',
    FOREIGN KEY(route_id) REFERENCES routes(id)
  )`);
});

module.exports = db;
