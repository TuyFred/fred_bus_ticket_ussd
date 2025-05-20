saveBooking: (phone, route, callback) => {
  const stmt = `INSERT INTO bookings (phone, route) VALUES (?, ?)`;
  db.run(stmt, [phone, route], function (err) {
    if (err) {
      console.error('DB Save Error:', err.message);
    }
    callback(err, this?.lastID);
  });
}

