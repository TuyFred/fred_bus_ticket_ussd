const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bus_ticket.db');

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  route TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = {
  saveBooking: (phone, route, callback) => {
    const stmt = `INSERT INTO bookings (phone, route) VALUES (?, ?)`;
    db.run(stmt, [phone, route], function (err) {
      callback(err, this.lastID);
    });
  },

  getAllBookings: (callback) => {
    db.all(`SELECT * FROM bookings`, (err, rows) => {
      callback(err, rows);
    });
  }
};
