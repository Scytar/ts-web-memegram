"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var uuid_1 = require("uuid");
var commentRepository_js_1 = require("./commentRepository.js");
dotenv.config();
var MONGODB_DSN = "mongodb://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PSW, "@").concat(process.env.MONGO_HOST, ":").concat(process.env.MONGO_PORT, "/").concat(process.env.MONGO_DB, "?retryWrites=true&w=majority");
var postSchem = new mongoose_1["default"].Schema({
    postId: {
        type: String,
        unique: true
    },
    post: {
        authorId: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        media: {
            type: String,
            required: true
        },
        likes: (Array),
        comments: (Array)
    },
    created_at: Date
});
var postModel = mongoose_1["default"].model('post', postSchem);
var PostRepository = /** @class */ (function () {
    function PostRepository() {
    }
    PostRepository.prototype.insert = function (postData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, newPost, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resp = { data: null, error: null };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_DSN)];
                    case 2:
                        _b.sent();
                        newPost = new postModel({
                            postId: (0, uuid_1.v4)(),
                            post: {
                                authorId: postData.authorId,
                                author: postData.author,
                                media: postData.media,
                                likes: [],
                                comments: []
                            },
                            created_at: Date.now()
                        });
                        _a = resp;
                        return [4 /*yield*/, newPost.save()];
                    case 3:
                        _a.data = _b.sent();
                        return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        resp.error = err_1.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, resp];
                }
            });
        });
    };
    PostRepository.prototype.listAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resp = { data: null, error: null };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_DSN)];
                    case 2:
                        _b.sent();
                        _a = resp;
                        return [4 /*yield*/, postModel.find()];
                    case 3:
                        _a.data = _b.sent();
                        return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        resp.error = err_2.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, resp];
                }
            });
        });
    };
    PostRepository.prototype.listBy = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resp = { data: null, error: null };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_DSN)];
                    case 2:
                        _b.sent();
                        _a = resp;
                        return [4 /*yield*/, postModel.find(query)];
                    case 3:
                        _a.data = _b.sent();
                        if (resp.data[0] == null) {
                            resp.error = "Error: not found";
                        }
                        return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _b.sent();
                        resp.error = err_3.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, resp];
                }
            });
        });
    };
    PostRepository.prototype.like = function (postData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, index, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resp = { data: null, error: null };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_DSN)];
                    case 2:
                        _b.sent();
                        _a = resp;
                        return [4 /*yield*/, postModel.findOne({ postId: postData.postId })];
                    case 3:
                        _a.data = _b.sent();
                        if (!!resp.data.post.likes.includes(postData.userId)) return [3 /*break*/, 5];
                        resp.data.post.likes.push(postData.userId);
                        return [4 /*yield*/, resp.data.save()];
                    case 4:
                        resp = _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        index = resp.data.post.likes.indexOf(postData.userId);
                        resp.data.post.likes.splice(index, 1);
                        return [4 /*yield*/, resp.data.save()];
                    case 6:
                        resp = _b.sent();
                        _b.label = 7;
                    case 7: return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        err_4 = _b.sent();
                        resp.error = err_4.message;
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, resp];
                }
            });
        });
    };
    PostRepository.prototype.comment = function (postData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, comment, result, _b, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        resp = { data: null, error: null };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_DSN)];
                    case 2:
                        _c.sent();
                        _a = resp;
                        return [4 /*yield*/, postModel.findOne({ postId: postData.postId })];
                    case 3:
                        _a.data = _c.sent();
                        if (!resp.data) return [3 /*break*/, 8];
                        comment = new commentRepository_js_1["default"]();
                        return [4 /*yield*/, comment.insert(postData.comment)];
                    case 4:
                        result = _c.sent();
                        if (!!result.data) return [3 /*break*/, 5];
                        resp.error = result.error;
                        return [2 /*return*/, resp];
                    case 5:
                        resp.data.post.comments.push(result.data.commentId);
                        return [4 /*yield*/, mongoose_1["default"].connect(MONGODB_DSN)];
                    case 6:
                        _c.sent();
                        _b = resp;
                        return [4 /*yield*/, resp.data.save()];
                    case 7:
                        _b.data = _c.sent();
                        _c.label = 8;
                    case 8: return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        err_5 = _c.sent();
                        resp.error = err_5.message;
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/, resp];
                }
            });
        });
    };
    return PostRepository;
}());
exports["default"] = PostRepository;
