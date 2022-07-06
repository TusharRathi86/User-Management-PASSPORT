const controller = require('../controllers/newUserController.controller')
const express = require('express')
const verify = require('../validation/flashMessages')
const verification = require('../middleware/verification')
const upload = require('../middleware/multer')
const router = express.Router()

// Render New User Form 
router.get("/newUser", (req, res) => { res.render('newUser') })

// Show User List 
router.get("/", controller.viewUsers)

// Add New User 
// router.post("/addUser", upload.fileUpload.single('image'), verify.userValidation, verification.duplicateEmailNUsername, controller.addUser)

// Update Info Of Existing User
router.get("/change_form/:id", controller.change_form)
router.post("/updateUser/:id", upload.fileUpload.single('image'), controller.updateUser)

// Delete Existing User 
router.get("/deleteUser/:id", controller.deleteUser);

module.exports = router