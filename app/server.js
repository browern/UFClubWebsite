const express = require('express');
const cors = require('cors');
const path = require('path');


const mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'internal_use_only',
  database : 'ufclubwebsite'
});


const app = express();
const port = 8080;

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Here is the home page')
})

app.get('/calendar/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/calendar.png'))
})

app.get('/data/', (req, res) => {
  connection.connect();
  connection.query('SELECT * FROM Events', function (error, results, fields) {
    if (error) res.send('error when retrieving data: ' + error.code);
    res.send(results);
  });
  connection.end();
})

app.get('/calendar/current', (req, res) => {
  //Replace with actual data
  res.json({events: [{month: "October", day: "28", name: "Sprint 1 Presentation", description: "TODO"}, {month: "October", day: "29", name: "Sprint 1 Party", description: "Get crazy!"}]})
})

app.get('/index/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(port, () => console.log(`API is running on http://localhost:${port}`));
