const db = require('../models')
const User = db.logininfos

checkUsername = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then((user) => {
        if (user) {
            req.flash('danger', "Failed! Username already exists")
            return res.redirect('/create')
        }
        next()
    })
}

const verify = {
    duplicateUsername: checkUsername,
}

module.exports = verify