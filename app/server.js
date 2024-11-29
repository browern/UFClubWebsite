const express = require('express');
const cors = require('cors');
const path = require('path');


const mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '[PASSWORD]',
  database : 'ufclubwebsite'
});
connection.connect();


const app = express();
const bodyParser = require('body-parser')
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.execute('SELECT `password` FROM `member_data` WHERE `username` = ?', [username], function (error, results, fields) {
    if (error) res.send('error when retrieving data: ' + error.code);
    if(password == results[0]['password']) {
        res.send({
           token: true
        });
    } else {
        console.log(results);
        res.send('Invalid password.');
    }
  });
  
});

app.post('/register', (req, res) => {
  const member = [req.body.username, req.body.password, req.body.first_name, req.body.last_name, req.body.year, req.body.email];

  connection.execute('INSERT INTO member_data VALUES (?, ?, ?, ?, ?, ?)', member, function (error, results, fields) {
    if (error) {
       res.send('error when registering: ' + error.code);
       return;
    }
    res.send('Registered.');
  });
  
});

app.post('/create_event', (req, res) => {
  const event = [req.body.event_name, req.body.month, req.body.day, req.body.year, req.body.location, req.body.person_of_contact, req.body.start_time, req.body.end_time, req.body.points_awarded];

  connection.execute('INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', event, function (error, results, fields) {
    if (error) {
       res.send('error when adding event: ' + error.code);
       return;
    }
    res.send('Event added.');
  });
  
});


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Here is the home page')
})

app.get('/data/', (req, res) => {
  connection.query('SELECT * FROM Events', function (error, results, fields) {
    if (error) res.send('error when retrieving data: ' + error.code);
    res.send(results);
  });
})


app.get('/index/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(port, () => console.log(`API is running on http://localhost:${port}`));