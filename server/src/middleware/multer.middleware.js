// import multer from "multer";
// import path from "path";

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "../public/images/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// export default upload;
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../public/images/");
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Avoid filename collisions
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
export default upload;