const db = require('../models')
const User = db.userinfos
const logUser = db.logininfos
const Sequelize = require('sequelize')
const op = Sequelize.Op

// View all users in the database
exports.allUserList = (req, res) => {
    User.findAll({
        include: [{
            model: logUser,
            attributes: ['email'],
            required: true,
            where: { Role: { [op.ne]: req.user.Role } },
        }],
    }).then((users) => { return res.render('Admin/dashboard', { data: users }) })
}