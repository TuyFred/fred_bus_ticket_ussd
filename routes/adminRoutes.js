const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add a new route
router.post('/routes', adminController.addRoute);

// Edit a route
router.put('/routes/:id', adminController.editRoute);

// Get all routes
router.get('/routes', adminController.getRoutes);

// View all bookings
router.get('/bookings', adminController.getBookings);

// Set default language (English or Kinyarwanda)
router.post('/language', adminController.setLang);

module.exports = router;
