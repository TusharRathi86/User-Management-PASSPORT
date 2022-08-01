const express = require('express')
const passport = require('passport')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
const router = express.Router()
const controller = require('../controllers/login.controller')
const userEmail = require('../middleware/userEmailVerification')

// Render logIn page
router.get('/', (req, res) => { return res.render('logIn') },)

// Render createLogin page
router.get('/create', (req, res) => { return res.render('createLogin') })

// Create login credentails
router.post('/createLogin', userEmail.duplicateUserEmail, controller.createLoginCredentials)

// Posting
router.post('/logIn', ensureLoggedOut({ redirectTo: '/' }),
    passport.authenticate('local', {
        successReturnToOrRedirect: '/user',
        failureRedirect: '/',
        failureFlash: true,
    }))

// LogOut
router.get('/logout', ensureLoggedIn({ redirectTo: '/' }), (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            return res.send('Error')
        }
        if (!err) {
            return res.render('logIn', { logout: "logout successfull....!" });
        }
    })
})

module.exports = router