const db = require('../models/db');

// Add a new route
exports.addRoute = (req, res) => {
  const { name, price, seats } = req.body;
  db.run('INSERT INTO routes (name, price, seats) VALUES (?, ?, ?)', [name, price, seats], (err) => {
    if (err) return res.status(500).send('Error adding route');
    return res.send('Route added successfully');
  });
};

// Edit an existing route
exports.editRoute = (req, res) => {
  const { id } = req.params;
  const { name, price, seats } = req.body;
  db.run('UPDATE routes SET name = ?, price = ?, seats = ? WHERE id = ?', [name, price, seats, id], (err) => {
    if (err) return res.status(500).send('Error updating route');
    return res.send('Route updated successfully');
  });
};

// Get all routes
exports.getRoutes = (req, res) => {
  db.all('SELECT * FROM routes', (err, rows) => {
    if (err) return res.status(500).send('Error fetching routes');
    return res.json(rows);
  });
};

// View all bookings
exports.getBookings = (req, res) => {
  db.all(`
    SELECT b.id, b.phone, b.status, r.name AS route 
    FROM bookings b JOIN routes r ON b.route_id = r.id
  `, (err, rows) => {
    if (err) return res.status(500).send('Error fetching bookings');
    return res.json(rows);
  });
};

// Set language (stub - for future extension)
exports.setLang = (req, res) => {
  const { lang } = req.body;
  if (!['en', 'rw'].includes(lang)) return res.status(400).send('Invalid language. Choose "en" or "rw".');
  res.setLocale(lang);
  return res.send(`Language set to ${lang}`);
};
