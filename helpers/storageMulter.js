// const multer = require('multer') // dùng để upload ảnh
// không cần import vì mình đã truyền multer vào rồi    
//của ngta code trên npm multer r mình chỉ ké thôi dùng để lấy tên ảnh ok
module.exports= (multer) => { 
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, `${uniqueSuffix}-${file.originalname}`);  // lưu tên file dưới dạng như này
        }
    })
    return storage;
}