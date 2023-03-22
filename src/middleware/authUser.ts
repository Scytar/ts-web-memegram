//Camada de autenticação do user com jsonwebtoken
import { Response, Request, NextFunction } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const authUser = async (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.cookies;
    console.log(token);
    try {

        if (!token) {
            return res.status(403).send('No token provided');
        } else {
            const check: any = jwt.verify(token as string, process.env.SECRET_JWT as string);
            if (check) {
                next();
            }
        }

    } catch (error) {
        res.status(401).send('Authentication failed');
    }
};

export { authUser };

