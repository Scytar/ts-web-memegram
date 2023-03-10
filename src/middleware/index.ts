//Camada de autenticação do user com jsonwebtoken
import { Response, Request, NextFunction } from 'express'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';



