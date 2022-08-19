const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const flash = require('connect-flash')
const session = require('express-session')
const path = require('path')
const passport = require('passport');
const { ensureLoggedIn } = require('connect-ensure-login')
const auth = require('./utils/roleAuth')
const user = require('./routes/newUser.routes')
const admin = require('./routes/admin.routes')
const passApi = require('./routes/API/forgetPassword.routes')
const router = require('./routes/logIn.routes')
require('dotenv').config();

// Middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session
app.use(session({
    resave: false,
    cookie: { maxAge: 600000, httpOnly: true },
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
app.use('/pass', passApi)
app.use('/admin/dashboard', ensureLoggedIn({ redirectTo: '/' }), auth.ensureAdmin, admin)
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