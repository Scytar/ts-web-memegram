import { Response, Request } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import multer from 'multer';
import path from "path";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({

    destination: function (req: any, file: any, cb: any) {
        cb(null, './memegram-app/public/')
    },

    filename: function (req: any, file: any, cb: any) {
        if (!file || !file.originalname) {
            cb(null, "nochange");
        } else {

            const extension = path.extname(file.originalname);
            const filename = uuidv4() + extension;
            cb(null, filename);

        }
    }
});

const upload = multer({ storage });

export default upload;