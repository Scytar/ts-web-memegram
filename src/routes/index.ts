//rotas
import * as express from 'express';
import { login, newUser } from '../controller/userController';
import { newItems } from '../controller/postController';
import { authUser } from '../middleware/authUser';
import upload from "../middleware/uploadItems";

const router = express.Router();
router.use(express.json());

//Login
router.post("/login", login);
//Sign up
router.post("/newUser", newUser);
//Auth - post
router.post("/upload", upload.single("file"), authUser, newItems);

//"/users/:user_id"
//Auth - feed
//router.get("/feedItems", );
//Auth - post
//Auth - like
//Auth - comment



export default router;