//Camada de autenticação do user com jsonwebtoken
import { Response, Request } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import Multer from 'multer';
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = Multer.diskStorage({
    destination: "../uploads/",
    filename: (req: Request, res: Response, file: Multer.File, cb: Multer.FileFilterCallback) => {
        if (!file || !file.originalname) {
           
            cb(null, "nochange");
       
        } else {
            
            const extension = path.extname(file.originalname);
            const filename = uuidv4() + extension;
            cb(null, filename);
      
        }
    },
});

const upload = Multer({ storage });

export default upload;