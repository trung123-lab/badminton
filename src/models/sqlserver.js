const sql = require('mssql');

// Cấu hình kết nối
const config = {
    user: 'sa',             // Đúng: sử dụng 'user' thay vì 'username'
    password: '123456',     // Mật khẩu
    server: 'localhost',    // Địa chỉ máy chủ SQL Server
    database: 'Account',    // Tên cơ sở dữ liệu
    options: {
        encrypt: true,          // Sử dụng SSL (bật hoặc tắt tùy vào cấu hình máy chủ)
        trustServerCertificate: true // Cần thiết nếu dùng chế độ self-signed
    }
};

// Kết nối đến SQL Server
sql.connect(config).then(pool => {
    // Kết nối thành công
    console.log('Connected to SQL Server');

    // Thực hiện truy vấn
    return pool.request()
        .query('SELECT * FROM Account');
}).then(result => {
    console.log(result.recordset);
}).catch(err => {
    // Xử lý lỗi
    console.error('SQL error', err);
});

