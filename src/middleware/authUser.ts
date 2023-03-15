//Camada de autenticação do user com jsonwebtoken
import { Response, Request, NextFunction } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const secret: string = 'xfeyi356##$qsWRE';

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const [, token] = req.headers.authorization!.split(" ");

    try {
        const check: any = jwt.verify(token, secret);
        if (check) {
            next();
        }

    } catch (error) {
        res.status(401).send('Authentication failed');
    }
};

export { authUser };

