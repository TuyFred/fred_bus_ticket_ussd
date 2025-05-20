const db = require('./db');

const BookingModel = {
  createBooking(booking, callback) {
    const { route_id, phone } = booking;
    db.run(
      "INSERT INTO bookings (route_id, phone, status) VALUES (?, ?, 'booked')",
      [route_id, phone],
      callback
    );
  },

  getBookingsByPhone(phone, callback) {
    db.all("SELECT * FROM bookings WHERE phone = ?", [phone], callback);
  },

  cancelBooking(id, callback) {
    db.run("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [id], callback);
  },

  getAllBookings(callback) {
    db.all("SELECT * FROM bookings", callback);
  }
};

module.exports = BookingModel;
