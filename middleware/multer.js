const express = require('express')
const multer = require('multer')
const path = require('path')

const fileStorageEngine = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        // cb(null, Date.now() + "--" + file.originalname);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: fileStorageEngine })

const fileUpload = {
    fileUpload: upload
}

module.exports = fileUpload