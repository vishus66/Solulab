const multer = require("multer")

function fileupload(folder){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `public/${folder}`)
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        }
      })
    return multer({ storage: storage })
}
  
const uploaduser = fileupload("user")
module.exports = {
    uploaduser
}