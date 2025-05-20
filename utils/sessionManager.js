// utils/sessionManager.js

const sessions = new Map();

function getSession(phoneNumber) {
  if (!sessions.has(phoneNumber)) {
    sessions.set(phoneNumber, { step: 0, data: {} });
  }
  return sessions.get(phoneNumber);
}

function updateSession(phoneNumber, sessionData) {
  sessions.set(phoneNumber, sessionData);
}

function resetSession(phoneNumber) {
  sessions.delete(phoneNumber);
}

module.exports = {
  getSession,
  updateSession,
  resetSession
};
