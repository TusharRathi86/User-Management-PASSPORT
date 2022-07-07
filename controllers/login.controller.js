const db = require('../models')
const User = db.logininfos
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.createLoginCredentials = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('danger', error.msg)
        })
        return res.redirect('/createLogin')
    }

    if (errors.isEmpty()) {
        try {
            // Hashed password 
            const hashPassword = await bcrypt.hash(req.body.password, 10)
            User.create({
                username: req.body.username,
                password: hashPassword,
            })
            return res.render('logIn', { credentialsMessage: 'User credentials created successfully' })
        } catch (error) {
            console.log(error)
            return res.send('error')
        }
    }
}