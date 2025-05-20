const sessions = {};

module.exports = {
  getSession: (phone) => {
    if (!sessions[phone]) sessions[phone] = {};
    return sessions[phone];
  },

  setLanguage: (phone, lang) => {
    if (!sessions[phone]) sessions[phone] = {};
    sessions[phone].lang = lang;
  }
};
