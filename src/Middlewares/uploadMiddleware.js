import multer from 'multer';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, './src/public/images');
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
const upload = multer({ storage });
const uploadSingle = upload.single('image');

export default uploadSingle;
