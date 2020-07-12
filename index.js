var express = require('express');
var bodyParser = require('body-parser');

var authRoute = require('./src/routes/auth.route');


var port = 3000;
var app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('src/public'));

//Routes
app.get("/login", function (req, res) {
    res.render("auth/login");
})

app.listen(port, function() {
    console.log('Server listening on port ' + port);
})