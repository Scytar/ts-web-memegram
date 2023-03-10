//rotas
import * as express from 'express';
import { getLogin, postUser } from '../controller/index';


const router = express.Router();
router.use(express.json());

//Login
router.get("/login", getLogin);
//Sign up
router.post("/users/", postUser);
//Logout
//Auth - home
//Auth - post
//Auth - like
//Auth - comment



export default router;