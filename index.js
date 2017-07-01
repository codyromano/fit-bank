const express = require('express');
const path = require('path');

const app = express();
const appBasePath = '/fit-bank/';
const SERVER_PORT = 3456;

const publicDir = path.join(__dirname, 'src/public');
app.use(appBasePath, express.static(publicDir));

app.listen(SERVER_PORT, function() {
  console.log('fit-bank listening on port %s!', SERVER_PORT);
});
