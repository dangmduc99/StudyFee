const express = require('express');
const app = express();
 
const port = 3000;

app.use(express.static("./src/public"));
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', function (req, res) {
  res.render('index');
})

app.get('/signin', function (req, res) {
  res.render('sign-in');
})
 
app.listen(port, () =>
    console.log(`Listening on port ${port}!`))