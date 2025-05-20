const i18n = require('../utils/i18n');
const sessionManager = require('../utils/sessionManager');
const bookingModel = require('../models/bookingModel'); // Import booking model

const routes = {
  1: "Kigali - Musanze",
  2: "Huye - Kigali",
  3: "Kigali - Rwamagana",
  4: "Nyabugogo - Nairobi"
};

module.exports = {
  handleUSSD: (req, res) => {
    const { text, phoneNumber } = req.body;
    let response = '';
    let session = sessionManager.getSession(phoneNumber);
    const input = text.split('*');

    switch (input.length) {
      case 1: // Language selection
        response = `CON Select Language\n1. English\n2. Kinyarwanda`;
        break;

      case 2: // Save language
        const lang = input[1] === '2' ? 'rw' : 'en';
        sessionManager.setLanguage(phoneNumber, lang);
        i18n.setLocale(lang);
        response = `CON ${i18n.__('select_option')}`; // E.g., "1. Buy Ticket"
        break;

      case 3: // Main menu
        i18n.setLocale(session.lang || 'en');
        if (input[2] === '1') {
          response = `CON ${i18n.__('select_route')}`; // E.g., "1. Kigali-Musanze..."
        } else {
          response = `END ${i18n.__('session_end')}`;
        }
        break;

      case 4: // Route selected — now save booking
        i18n.setLocale(session.lang || 'en');
        const route = routes[input[3]];
        if (route) {
          bookingModel.saveBooking(phoneNumber, route, (err, id) => {
            if (err) {
              response = `END ${i18n.__('error_saving')}`;
            } else {
              response = `END ${i18n.__('ticket_success', { route })}`;
            }
            res.set('Content-Type', 'text/plain');
            res.send(response);
          });
          return; // prevent sending response twice
        } else {
          response = `END ${i18n.__('invalid_option')}`;
        }
        break;

      default:
        response = `END ${i18n.__('invalid_input')}`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
  }
};

