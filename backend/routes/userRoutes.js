const express = require('express');
const path = require('path');
const router = express.Router();

// Định nghĩa các route
router.get('/register', (req, res) => {
  // Xử lý đăng ký
  res.send('Đăng ký thành công!');
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

module.exports = router;
