const controller = require('../../controllers/API/auth.controller')
const express = require('express')
const router = express.Router()

// Render forget password page
router.get('/forgetPass', (req, res) => { return res.render('client/forgetPass') },)

// Render change password page
router.get('/changePass', (req, res) => { return res.render('client/changePass') },)

// Verify mail
router.post('/verifyMail', controller.forgetPassword)

// Verify otpI
router.post('/verifyOtp', controller.verifyOtp)

// Change Password
router.post('/changePassword', controller.changePassword)

module.exports = router