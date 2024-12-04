const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes'); // Import routes cho user
const productRoutes = require('./routes/productRoutes'); // Import routes cho sản phẩm

const app = express();

// Khai báo đường dẫn tuyệt đối đến tệp index.html
const indexPath = path.join(__dirname, 'frontend', 'index.html');
console.log('Đường dẫn index.html:', indexPath);  // In ra đường dẫn

// Middleware để xử lý JSON
app.use(express.json());

// Middleware để xử lý CORS
app.use(cors());

// Cấu hình phục vụ các tệp tĩnh từ thư mục 'frontend'
app.use('/css', express.static(path.join(__dirname, 'frontend', 'css')));
app.use('/images', express.static(path.join(__dirname, 'frontend', 'images')));
app.use('/js', express.static(path.join(__dirname, 'frontend', 'js')));

// Kết nối MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TheGioiSach';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Kết nối MongoDB thành công!');
  })
  .catch((error) => {
    console.error('Lỗi kết nối MongoDB:', error.message);
    process.exit(1);  // Dừng ứng dụng nếu không thể kết nối MongoDB
  });

// Sử dụng routes
app.use('/api/users', userRoutes); // Routes cho user
app.use('/api/products', productRoutes); // Routes cho sản phẩm

// Đường dẫn tới tệp index.html
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'frontend', 'index.html');
  console.log('Đang phục vụ tệp index.html từ đường dẫn:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Lỗi khi phục vụ tệp index.html:', err);
      res.status(500).send('Không thể tải trang index.html');
    }
  });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error('Đã xảy ra lỗi:', err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi trên server!' });
});

// Chạy server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
