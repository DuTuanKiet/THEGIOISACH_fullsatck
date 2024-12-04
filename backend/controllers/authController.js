// /backend/controllers/authController.js
const User = require('../models/User');

// API đăng ký người dùng
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Kiểm tra nếu tất cả các trường đều có giá trị
  if (!name || !email || !password) {
    return res.status(400).send('Vui lòng cung cấp đủ thông tin!');
  }

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email đã tồn tại!');
    }

    // Tạo một người dùng mới
    const newUser = new User({
      name,
      email,
      password
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    res.status(201).send('Người dùng đã đăng ký thành công!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Lỗi khi đăng ký người dùng!');
  }
};

module.exports = { registerUser };
