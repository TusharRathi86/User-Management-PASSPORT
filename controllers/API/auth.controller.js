const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const db = require('../../models')
const logUser = db.logininfos
const Otp = db.otps

exports.forgetPassword = async (req, res) => {

    const data = await logUser.findOne({ where: { email: req.body.email } })

    if (data) {

        // Time 
        const minutesToAdd = 2
        const currentDate = new Date()
        const futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000)
        const otpCode = Math.floor((Math.random() * 1000000) + 1)
        const optData = {
            otpId: data.id,
            otp: otpCode,
            expiryDate: futureDate
        }
        const otpResponse = await Otp.create(optData)

        // Sending email 
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'tushar.rathi860@gmail.com',
                pass: 'vbjjjhalqrfbqpuw'
            }
        })

        const mailOptions = {
            from: 'tushar.rathi860@gmail.com',
            to: 'rathitushar25@gmail.com',
            subject: 'Sending Email using Node.js',
            text: `That was easy! OTP: ${otpResponse.otp}`
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })

        return res.render('client/forgetPass', { key: 'success', messagesCre: 'OTP sent successfully!', })
    }
    return res.render('client/forgetPass', { key: 'danger', messagesCre: 'Email does not exist!' })
}

exports.verifyOtp = async (req, res) => {

    const currentDate = new Date()
    const data = await Otp.findOne({ where: { otp: req.body.otpCode } })

    if (data) {
        // Expiring otp after 2 minutes
        if (data.expiryDate > currentDate) {
            return res.render('client/changePass', { key: 'success', messagesCre: 'OTP verified!!' })
        }
        return res.render('client/forgetPass', { key: 'danger', messagesCre: 'OTP expired!!' })
    }
    return res.render('client/forgetPass', { key: 'danger', messagesCre: 'Incorrect OTP!!' })
}

exports.changePassword = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    logUser.update({
        password: hashPassword
    },
        { where: { email: req.body.email } })
    res.render('logIn', { key: 'success', messagesCre: 'Password Updated successfully!' })
}