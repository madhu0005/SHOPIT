import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, { folder, resource_type: "auto" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    });
  });
};

export const delete_file = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(file, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
