const db = require('../models')
const User = db.userinfos
const logUser = db.logininfos

verification = (req, res, next) => {
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
  })
  // Username
  logUser.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user) {
      req.flash('danger', "Failed! Username already exists")
      return res.redirect('/user/newUser')
    }
    next()
  })
}

const verify = {
  duplicateEmailNUsername: verification
}

module.exports = verify