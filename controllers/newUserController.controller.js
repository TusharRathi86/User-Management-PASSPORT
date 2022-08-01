const db = require('../models')
const User = db.userinfos
const logUser = db.logininfos
const { validationResult } = require('express-validator')
const { roles } = require('../utils/constants')

exports.viewUsers = (req, res) => {
    const person = req.user
    User.findAll({
        include: [{
            model: logUser,
            attributes: ['email'],
            required: true,
        }],
        where: { userId: req.user.id },
    }).then((users) => res.render('home', { person, role: roles.admin, data: users }))
}

exports.addUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('danger', error.msg)
        })
        return res.redirect('/user/newUser')
    }
    else {
        // User Table
        await User.create(
            {
                userId: req.user.id,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                image: req.file.filename,
            },
            { where: { id: req.user.id } })

        req.flash('success', `${req.body.name} has been added successfully`)
        return res.redirect('/user')
    }
}

exports.change_form = (req, res) => {
    User.findOne({
        include: [{
            model: logUser,
            attributes: ['email'],
            required: true,
        }],
        where: { id: req.params.id }
    }).then(getUser => res.render('change', { data: getUser }))
}

exports.updateUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // If no image is selected 
    if (!req.file) {
        await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
            },
            { where: { id: req.params.id } })

        req.flash('success', `${req.body.name} has been updated successfully`)
        return res.redirect('/user')
    }
    // If image is selected 
    if (req.file) {
        await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                image: req.file.filename,
            },
            { where: { id: req.params.id } })

        req.flash('success', `${req.body.name} has been updated successfully`)
        return res.redirect('/user')
    }
}

exports.deleteUser = async (req, res, next) => {
    await User.destroy({
        where: { id: req.params.id }
    })
    req.flash('danger', 'User deleted')
    return res.redirect('/user')
}