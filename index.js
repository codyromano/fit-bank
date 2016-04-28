const SERVER_PORT = 3000;

var express = require('express');
var app = express();

// Static directory
app.use(express.static(__dirname + '/src/public'));

// Rendering views
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('index'); 
});

app.listen(SERVER_PORT, function() {
  console.log('fit-bank listening on port %s!', SERVER_PORT);
});