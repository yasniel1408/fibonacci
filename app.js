var express = require('express');
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
 
var Secuencia = require('./routes/Secuencia');
app.use('/secuencia', Secuencia);

app.use(express.static(__dirname + '/client/build'))

// app.get('/', function (req, res) {
//   res.send('El servidor esta corriendo correctamente!!!');
// });
 
app.listen(port, function () {
  console.log('Example app listening on port 5000!!!');
});
