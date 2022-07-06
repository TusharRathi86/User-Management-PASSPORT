const db = require('../models')
const User = db.logininfos

exports.createLoginCredentials = async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            password: req.body.password,
        })
        return res.render('logIn', { homeMessage: 'Credentails created...!!' })
    } catch (err) {
        console.log(err)
        return res.send("ERROR")
    }
}