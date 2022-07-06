const { check } = require('express-validator')
module.exports = {
    userValidation: [
        check('name', 'Name should have atleast 3+ characters')
            .trim()
            .isLength({min:3, max:50}),

        check('email')
            .isEmail()
            .withMessage('Enterd mail is invalid')
            .trim(),

        check('phoneNumber', 'Please insert a number')
            .trim()
            .isLength({min:10, max:10}),
        
        check('address', 'Enter a valid address')
            .trim()
            .isLength({min:5, max: 60})
    ],
}