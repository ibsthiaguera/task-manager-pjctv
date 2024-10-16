import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads')
        cb(null, uploadsPath)
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}`
        cb(null, fileName)
    },
})

const upload = multer({ storage }).single('file')

export { upload }
