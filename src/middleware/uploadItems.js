"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var multer_1 = require("multer");
var path_1 = require("path");
var uuid_1 = require("uuid");
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, './memegram-app/public/');
    },
    filename: function (req, file, cb) {
        if (!file || !file.originalname) {
            cb(null, "nochange");
        }
        else {
            var extension = path_1["default"].extname(file.originalname);
            var filename = (0, uuid_1.v4)() + extension;
            cb(null, filename);
        }
    }
});
var upload = (0, multer_1["default"])({ storage: storage });
exports["default"] = upload;
