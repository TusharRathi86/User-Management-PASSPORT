const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const flash = require('connect-flash')
const session = require('express-session')
const user = require('./routes/newUser.routes')
const router = require('./routes/logIn.routes')
const path = require('path')
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')
require('dotenv').config();

// Middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session
app.use(session({
    resave: false,
    cookie: { maxAge: 60000, httpOnly: true },
    secret: 'secret here',
    saveUninitialized: true,
}))

// Flash Messages
app.use(flash())
app.use((req, res, next) => {
    res.locals.messages = req.flash()
    next()
})

// For Passport JS Authentication
app.use(passport.initialize())
app.use(passport.session())
require('./utils/passport.auth')

// Routes
app.use('/', router)
// app.use('/user', user)
app.use('/user', ensureLoggedIn({ redirectTo: '/' }), user)

// View Engine 
app.set('view engine', 'ejs')

// Server
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})

//load assets
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/css', express.static(path.join(__dirname, "assets/css")))
app.use('/img', express.static(path.join(__dirname, "assets/images")))
app.use('/js', express.static(path.join(__dirname, 'assets/js')))