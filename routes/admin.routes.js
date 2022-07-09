const express = require('express');
const router = express.Router()
const controller = require('../controllers/admin.controller')

// View all users
router.get("/", controller.allUserList)

module.exports = router