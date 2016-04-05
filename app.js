var express = require('express');
var path = require('path');

var app = express();
var port = 3000;

app.get('/', function(req, res) {

  res.sendFile(path.join(__dirname, './public/index.html'));
  console.log('received a request!');
});

// Sets a static directory to load files from
app.use(express.static('public'));

app.post('/', function(req, res) {
  console.log('Post request received');
  res.sendStatus(204);
});

app.listen(port, function() {
  console.log('Server is listening on port', port);
});
