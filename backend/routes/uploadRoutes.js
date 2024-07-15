const path = require('path')
const express = require('express')
const multer = require('multer')

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})

function fileFilter(req, file, cb) {
    const fileTypes = /jpe?g|png|webp/;
    const mimeTypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = mimeTypes.test(file.mimetype);
    if (extname && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false)
    }

}
const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/', (req, res) => {
    uploadSingleImage(req, res, (err) => {
        if (err) {
            res.status(400).send({ message: err.message })
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        const profilePicPath = req.file.path.replace(/\\/g, '/');
        res.status(200).send({
            message: 'Image Uploaded successfully',
            profilePic: `/${profilePicPath}`
        })
    })

})


module.exports = router;    