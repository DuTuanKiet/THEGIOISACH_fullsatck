// routes/productRoutes.js

// import module 'express' để sử dụng các tính năng của Frameword Express
const express = require('express');

// Tạo một đối tượng router từ express. Đây là nơi định nghĩa các router (API)
const router = express.Router();

// Dữ liệu mẫu cho sản phẩm
// 'product' là một mảng chứa danh sách các sản phẩm
const products = [
    { id: 1, ten: 'Sách 1', gia: 10, description: 'A Great Book' },
    { id: 2, ten: 'Sách 2', gia: 15, description: 'Another awesome book' }
];

/*
Định nghĩa router để lâsy danh sách tất cả sản phẩm:
- HTTP Method: GET
- Endpoint: /api/products
- Khi có yêu cầu gửi đến endpoint này, server trả về mảng 'products' dưới dạng JSON
*/
router.get('/', (req, res) => {
    res.json(products); // Trả về danh sách sản phẩm dưới dạng JSON
});

/*
Định nghĩa router để lấy thêm một sản phẩm mới:
- HTTP Method: POST
- Endpoint: /api/products/add
- Yêu cầu từ  client cần gửi dữ liệu sản phẩm dưới dạng JSON trong 'req.body'
- Sản phẩm mới được thêm vào mảng 'products' và phản hồi thành công được gửi về client
*/
router.post('/add', (req, res) => {
    const newProduct = req.body; // Nhận dữ liệu sản phẩm từ client
    newProduct.id = products.length + 1; // Cập nhật id cho sản phẩm mới
    products.push(newProduct); // Thêm sản phẩm vào mảng
    res.status(201).json({
        message: 'Thêm sản phẩm thành công!',
        product: newProduct // Trả về sản phẩm vừa thêm
    });
});

// Xuất 'Router' để sử dụng trong file khác (như 'server.js')
module.exports = router;