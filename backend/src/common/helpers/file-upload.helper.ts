import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

// Get absolute path to the upload directory
//const uploadPath = join(__dirname, '..', '..', 'assets', 'receipe_images');
const uploadPath = './src/assets/receipe_images';
export const storage = diskStorage({
  destination: (req, file, callback) => {
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
    console.log('Uploading to:', uploadPath); // Debug log
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const uniqueName = `${uuid()}${extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
