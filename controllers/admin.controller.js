const db = require('../models')
const User = db.userinfos
const logUser = db.logininfos

// View all users in the database
exports.allUserList = (req, res) => {
    User.findAll({
        include: [{
            model: logUser,
            attributes: ['username'],
            required: true,
        }],
    }).then((users) => { return res.render('Admin/dashboard', { data: users }) })
}