const db = require('../models/db');
const { getSession, updateSession, resetSession } = require('../utils/sessionManager');

exports.handleUSSD = (req, res) => {
  const { phoneNumber, text } = req.body;
  const lang = req.query.lang || 'en';
  const i18n = res.__.bind(res);
  const session = getSession(phoneNumber);
  const inputs = text.split('*');
  const currentInput = inputs[inputs.length - 1];

  const send = (msg) => res.send(msg.startsWith('END') ? msg : `CON ${msg}`);

  // Reset if user sends empty (new session)
  if (text === '') {
    session.step = 0;
    session.data = {};
    updateSession(phoneNumber, session);
    return send(i18n('menu.welcome'));
  }

  switch (session.step) {
    case 0:
      switch (currentInput) {
        case '1':
          db.all('SELECT * FROM routes', (err, rows) => {
            if (rows.length === 0) return send('END No routes available.');
            let msg = rows.map(r => `${r.id}. ${r.name}`).join('\n');
            return send(`Available routes:\n${msg}\n\n0. Back`);
          });
          return;
        case '3':
          db.all('SELECT * FROM routes', (err, rows) => {
            session.step = 1;
            session.data.routes = rows;
            updateSession(phoneNumber, session);
            let msg = i18n('menu.select_route') + '\n' + rows.map(r => `${r.id}. ${r.name}`).join('\n') + '\n0. Back';
            return send(msg);
          });
          return;
        case '0':
          resetSession(phoneNumber);
          return send(i18n('menu.welcome'));
        default:
          return send('END Invalid option.');
      }

    case 1: // Booking route selection
      if (currentInput === '0') {
        session.step = 0;
        updateSession(phoneNumber, session);
        return send(i18n('menu.welcome'));
      }

      const selectedRouteId = parseInt(currentInput);
      const route = session.data.routes.find(r => r.id === selectedRouteId);
      if (!route) return send('END Invalid route.');

      db.run('INSERT INTO bookings (route_id, phone) VALUES (?, ?)', [selectedRouteId, phoneNumber], (err) => {
        if (err) return send('END Booking failed.');
        resetSession(phoneNumber);
        return send('END ' + i18n('menu.book_success'));
      });
      return;

    default:
      resetSession(phoneNumber);
      return send('END Session expired or invalid.');
  }
};
