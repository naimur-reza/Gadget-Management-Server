import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  database_url_local: process.env.DATABASE_URL_LOCAL,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_ACCESS_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
