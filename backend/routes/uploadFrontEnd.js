const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router();


const getStorage = (type) => {
    return multer.diskStorage({
        destination(req, file, cb) {

            const folder =
                type === "rooms"
                    ? "rooms"
                    : type === "services"
                        ? "services"
                        : type === "gallery"
                            ? "galleryImages"
                            : "unknown"; // Default to 'unknown' if type is 
            cb(null, `upload_frontend/${folder}`)
        },
        filename: (req, file, cb) => {
            cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
        }
    })
}

//function to getUploadMiddleware
const getUploadMiddleware = (type) => {
    const storage = getStorage(type)

    return multer({ storage: storage }).single('image')
}

router.post('/:type', (req, res) => {
    const type = req.params.type;
    const upload = getUploadMiddleware(type);
    upload(req, res, (err) => {

        if (err) {
            return res.status(400).send({ message: err.message })
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        const profilePicPath = req.file.path.replace(/\\/g, '/');
        res.status(200).send({
            message: 'Image Uploaded successfully',
            imagePath: `/${profilePicPath}`
        })
    })
})

module.exports = router;