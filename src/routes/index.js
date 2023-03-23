"use strict";
exports.__esModule = true;
//rotas
var express = require("express");
var userController_1 = require("../controller/userController");
var postController_1 = require("../controller/postController");
var commentController_1 = require("../controller/commentController");
var likeController_1 = require("../controller/likeController");
var feedController_1 = require("../controller/feedController");
var authUser_1 = require("../middleware/authUser");
var uploadItems_1 = require("../middleware/uploadItems");
var path_1 = require("path");
var router = express.Router();
router.use(express.json());
//Login
router.post("/login", userController_1.login);
//Sign up
router.post("/signup", userController_1.newUser);
//Logout
router.get('/logout', userController_1.logout);
//Auth - post
router.post("/upload", authUser_1.authUser, uploadItems_1["default"].single("media"), postController_1.newItems);
//Auth - insert comment
router.post("/comment", authUser_1.authUser, commentController_1.newComment);
//Auth - list comment
// router.get("/comment/:postId", authUser, listComment);
//Auth - feed
router.get("/feed", authUser_1.authUser, feedController_1.feed);
//Auth - like
router.post("/like", authUser_1.authUser, likeController_1.newLike);
router.get("/*", function (req, res, next) {
    res.sendFile(path_1["default"].join(__dirname, "memegram-app", "build", "index.html"));
});
exports["default"] = router;
