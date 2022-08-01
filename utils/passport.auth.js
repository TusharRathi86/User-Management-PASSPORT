const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('../models')
const User = db.logininfos

passport.use(
    new LocalStratergy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ where: { email: email } })
                if (!user) {
                    return done(null, false, {
                        message: 'Email or password mismatch'
                    })
                }
                const isMatch = await bcrypt.compare(password, user.password)
                return isMatch ? done(null, user) : done(null, false,
                    { message: 'Email or password mismatch' })
            }
            catch (error) {
                return done(error)
            }
        }
    ))

passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    await User.findByPk(id).then(function (user) {
        if (user) {
            return done(null, user.get())
        } else {
            return done(user.errors, null)
        }
    })
})