require('dotenv').config();
const express = require('express');//common js
const path = require('path');//common js
const bodyParser = require('body-parser');
const app = express(); //app express
const port = process.env.PORT || 3000; //port 

const db = require('./models/database')
const querystring = require('querystring');
const { error } = require('console');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).send('Username and password are required');
  }

  const query = 'SELECT * FROM account WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
      if (err) {
          console.error('Error executing query:', err.stack);
          return res.status(500).send('Database query error');
      }

      if (results.length > 0) {
        console.log('Login successful:');
        console.log('Username:', username);
        console.log('Password:', password);
          res.redirect('/schedule');
      } else {
          res.status(401).send('Invalid username or password');
      }
  });
});

app.get('/register', (req,res) => {
  res.render('register', {
    error:null,
    username: ''
  })
})

app.post('/register', (req,res) => {
  const {username, password} = req.body;

  const query = 'Insert into account (username,password) values (?,?)';
  db.query(query, [username,password], (err,results) => {
    if(err) {
      console.error('Error inserting into the database:', err.stack);
      if (err.code === 'ER_DUP_ENTRY') {  // MySQL error code for duplicate entry
        return res.render('register', {
          error: 'Username already taken',
          username: username
        });
      }
      return res.status(500).send('Database insert error');
    } 
      res.redirect('/login');
      console.log('Register successfully');
      console.log('Username:',username);
      console.log('Password:',password);
  });
});

app.get('/schedule', (req, res) => {
  db.query('SELECT id, DATE_FORMAT(Day, "%Y-%m-%d") AS Day, Time FROM schedule', (err, results) => {
    if (err) throw err;
    console.log(results);
    res.render('datlich', { bookedSlots: results });
});
});

app.post('/schedule', (req, res) => {
  const { date, time } = req.body;
    const newBooking = { Day: date, Time: time };
    db.query('INSERT INTO schedule SET ?', newBooking, (err, result) => {
        if (err) {
            console.error('Error inserting into the database:', err.stack);
            return res.status(500).send('Database insert error');
        } 

        const bookingId = result.insertId; // Lấy ID của lịch vừa đặt

        // Chuyển hướng đến trang hóa đơn và truyền thông tin đặt lịch
        res.json({bookingId});
    });
});


app.get('/bill', (req, res) => {
  const bookingId = req.query.bookingId;

  // Query thông tin đặt lịch từ cơ sở dữ liệu sử dụng bookingId
  db.query('SELECT id, DATE_FORMAT(Day, "%Y-%m-%d") AS Day, Time FROM schedule WHERE id = ?', [bookingId], (err, result) => {
    if (err) {
      console.error('Error querying database:', err.stack);
      return res.status(500).send('Database query error');
    }

    if (result.length === 0) {
      return res.status(404).send('Booking not found');
    }

    const bookingDetails = result[0];

    // Render trang "bill" với thông tin đặt lịch
    res.render('bill', { booking: bookingDetails });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})