//rotas
import * as express from 'express';
import { login, newUser, logout } from '../controller/userController';
import { newItems } from '../controller/postController';
import { newComment } from '../controller/commentController';
import { createUpdateChat, newMessage } from '../controller/chatController';
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
router.post("/upload", authUser, upload.single("file"), newItems);
//Auth - insert comment
router.post("/comment", authUser, newComment);
//Auth - list comment
// router.get("/comment/:postId", authUser, listComment);
//Auth - feed
router.get("/feed", authUser, feed);
//Auth - like
router.post("/like", authUser, newLike);
//Auth - chat
router.post("/chats/", authUser, createUpdateChat);
//Auth - chat - message
router.put("/chat", authUser, newMessage);
//Auth - chat - deleteChat
// router.delete("/chats", authUser, deleteChat);

router.get("/*", (req: any, res: { sendFile: (arg0: any) => void; }, next: any) => {
    res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

export default router;