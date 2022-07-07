const db = require('../models')
const User = db.userinfos

checkEmail = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user) {
      req.flash('danger', "Failed! Email is already in use!")
      return res.redirect('/user/newUser')
    }
    next()
  })
}

const verify = {
  duplicateEmail: checkEmail,
}

module.exports = verify