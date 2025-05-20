const i18n = require('../utils/i18n');
const sessionManager = require('../utils/sessionManager');

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

      case 2: // Language saved
        const lang = input[1] === '2' ? 'rw' : 'en';
        sessionManager.setLanguage(phoneNumber, lang);
        i18n.setLocale(lang);
        response = `CON ${i18n.__('select_option')}`;
        break;

      case 3: // Main menu
        i18n.setLocale(session.lang || 'en');
        if (input[2] === '1') {
          response = `CON ${i18n.__('select_route')}`;
        } else {
          response = `END Session ended.`;
        }
        break;

      case 4: // Route selection
        i18n.setLocale(session.lang || 'en');
        const route = routes[input[3]];
        if (route) {
          response = `END ${i18n.__('ticket_success', { route })}`;
        } else {
          response = `END Invalid option.`;
        }
        break;

      default:
        response = `END Invalid input.`;
    }

    res.set('Content-Type: text/plain');
    res.send(response);
  }
};
