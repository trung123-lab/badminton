const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', { username, password }); // Kiểm tra xem yêu cầu có đến server không

  // Xử lý logic đăng nhập tại đây
  if (username === 'admin' && password === 'password') {
    res.json({ message: 'Đăng nhập thành công!' });
  } else {
    res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
