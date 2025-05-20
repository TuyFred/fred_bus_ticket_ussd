const express = require('express');
const bodyParser = require('body-parser');
const i18n = require('./utils/i18n');
const ussdRoutes = require('./routes/ussdRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(i18n.init);

// Default route
app.get('/', (req, res) => {
  res.send('USSD Bus Ticket System is running.');
});

// Routes
app.use('/ussd', ussdRoutes);
app.use('/admin', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
