var express = require('express');
var router = express.Router();
const usersData = require('../utils/usersData');

// GET /users - Lấy danh sách users
router.get('/', function(req, res, next) {
  try {
    res.json({
      success: true,
      count: usersData.length,
      data: usersData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách users',
      error: error.message
    });
  }
});

// GET /users/:id - Lấy user theo ID
router.get('/:id', function(req, res, next) {
  try {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: 'ID không hợp lệ'
      });
    }
    
    const user = usersData.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy user với ID ${userId}`
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy user',
      error: error.message
    });
  }
});

module.exports = router;
