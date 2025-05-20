const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ussdRoutes = require('./routes/ussdRoutes');
const i18n = require('./utils/i18n');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(i18n.init);
app.use('/', ussdRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
