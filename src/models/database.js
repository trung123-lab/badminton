const mysql = require('mysql2');

// Cấu hình kết nối
const config = {
    host: 'localhost', // Địa chỉ máy chủ MySQL
    user: 'root', // Tên người dùng MySQL
    password: 'Trunglolb1*', // Mật khẩu MySQL
    database: 'SWP' // Tên cơ sở dữ liệu MySQL
};

// Tạo kết nối đến MySQL
const connection = mysql.createConnection(config);

// Kết nối đến MySQL
connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Xuất kết nối để sử dụng ở nơi khác
module.exports = connection;
