import catchAsync from '../utilities/catchAsync';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

const storage = multer.memoryStorage();
const filter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    return cb(null, true);
  }
  cb('Please only upload images', false);
};

const uploadImage = multer({
  storage,
  fileFilter: filter,
});

export const uploadImages = uploadImage.array('images', 6);

export const resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];

  await Promise.all(
    req.files.map(async (file, i) => {
      const fileName = `${req.body.name
        .toLowerCase()
        .split(' ')
        .join('-')}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(1080, 1350)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, `assets/products/${fileName}`));

      await sharp(file.buffer)
        .resize(360, 450)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(path.join(__dirname, `assets/products/mobile/${fileName}`));

      req.body.images.push(fileName);
    })
  );

  next();
});

export const uploadSingleImage = uploadImage.single('profilePicture');

export const resizeSingleImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const filename = `${req.user.id}-${Date.now()}-profilePicture.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, `assets/profilePicture/${filename}`));

  req.body.profilePicture = filename;

  next();
});
