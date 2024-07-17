const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    },
});

const allowedTypes = /pdf|jpeg|jpg|png|gif|webp|svg/;

// Create the Multer upload instance with limits and a file filter
const upload = multer({
  storage,
  limits: { fileSize:  1 * 1024 * 1024 },  // Set file size limit to 1mb
  fileFilter: (req, file, cb) => {
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Only PDF and image files are allowed!');
    }
  },
});


module.exports=upload;