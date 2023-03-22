//rotas
import * as express from 'express';
import { login, newUser, logout } from '../controller/userController';
import { newItems } from '../controller/postController';
import { newComment, listComment } from '../controller/commentController';
import { newLike } from '../controller/likeController';
import { feed } from '../controller/feedController';
import { authUser } from '../middleware/authUser';
import upload from "../middleware/uploadItems";
import path from "path";


const router = express.Router();
router.use(express.json());

//Login
router.post("/login", login);
//Sign up
router.post("/signup", newUser);
//Logout
router.get('/logout', logout);
//Auth - post
router.post("/upload", authUser, upload.single("media"), newItems);
//Auth - insert comment
router.post("/comment", authUser, newComment);
//Auth - list comment
// router.get("/comment/:postId", authUser, listComment);
//Auth - feed
router.get("/feed", authUser, feed);
//Auth - like
router.post("/like", authUser, newLike);

router.get("/*", (req: any, res: { sendFile: (arg0: any) => void; }, next: any) => {
    res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

export default router;