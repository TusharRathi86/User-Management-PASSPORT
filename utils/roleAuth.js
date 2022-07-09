const { roles } = require('../utils/constants')

exports.ensureAdmin = (req, res, next) => {
    if (req.user.Role == roles.admin) {
        next();
    }

    if (req.user.Role !== roles.admin) {
        req.flash('warning', 'You are not authorised to see this page');
        return res.redirect('/user')
    }
}