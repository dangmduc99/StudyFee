var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var authRoute = require('./src/routes/auth.route');
var studentRoute = require('./src/routes/student.route');
var schoolRoute = require('./src/routes/school.route');


var port = 3000;
var app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('src/public'));
// app.use(session({
//     secret: 'mysecret',
//     cookie: {
//         maxAge: 60000
//     }
// }))

//Routes
app.use('/', authRoute);
app.use('/school', schoolRoute);
app.use('/student', studentRoute);


app.listen(port, function() {
    console.log('Server listening on port ' + port);
})