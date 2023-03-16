//rotas
import * as express from 'express';
import { login, newUser } from '../controller/userController';
import { newItems } from '../controller/postController';
import { newComment, listComment } from '../controller/commentController';
import { feed } from '../controller/feedController';
import { authUser } from '../middleware/authUser';
import upload from "../middleware/uploadItems";

const router = express.Router();
router.use(express.json());

//Login
router.post("/login", login);
//Sign up
router.post("/newUser", newUser);
//Auth - post
router.post("/upload",  authUser, upload.single("media"), newItems);
//Auth - insert comment
router.post("/comment", authUser, newComment);
//Auth - list comment
router.get("/comment/:postId", authUser, listComment);

//Auth - feed
router.get("/feed", authUser, feed);
//Auth - like


export default router;