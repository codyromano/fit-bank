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

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});