const db = require('../models')
const User = db.logininfos

checkUserEmail = (req, res, next) => {
    // User email
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user) => {
        if (user) {
            req.flash('danger', "Failed! email already exists")
            return res.redirect('/create')
        }
        next()
    })
}

const verify = {
    duplicateUserEmail: checkUserEmail,
}

module.exports = verify