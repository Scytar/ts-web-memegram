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
exports.getComment = exports.insertComment = void 0;
//business rules for posting and feed
var dotenv = require("dotenv");
dotenv.config();
var postRepository_1 = require("../repository/postRepository");
var commentRepository_1 = require("../repository/commentRepository");
var insertComment = function (dataComment) { return __awaiter(void 0, void 0, void 0, function () {
    var postRep, response, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                postRep = new postRepository_1["default"]();
                return [4 /*yield*/, postRep.comment({ postId: dataComment.postId, comment: { author: (_a = dataComment.comment) === null || _a === void 0 ? void 0 : _a.author, text: (_b = dataComment.comment) === null || _b === void 0 ? void 0 : _b.text } })];
            case 1:
                response = _c.sent();
                //const t: iResp = await postRep.comment({postId: "99226fd8-6c81-496f-931a-1fd788d8b605", comment:{author: 'test2', text:'test comment2'}})
                //---------------------------------------------------------------------------verify
                if (!response.error) {
                    // console.log("comment service 29");
                    return [2 /*return*/, { response: response }];
                }
                else {
                    // console.log("comment service 32");
                    throw new Error("".concat(response.error));
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _c.sent();
                return [2 /*return*/, { err: err_1.message }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.insertComment = insertComment;
var getComment = function (postId) { return __awaiter(void 0, void 0, void 0, function () {
    var postRep, comment, post, result, response, index, comments, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                postRep = new postRepository_1["default"]();
                comment = new commentRepository_1["default"]();
                return [4 /*yield*/, postRep.listBy({ postId: postId })];
            case 1:
                post = _a.sent();
                if (!post.data[0].post) return [3 /*break*/, 6];
                result = post.data[0].post;
                response = {
                    data: [],
                    error: null
                };
                index = 0;
                _a.label = 2;
            case 2:
                if (!(index < result.comments.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, comment.listBy({ commentId: result.comments[index] })];
            case 3:
                comments = _a.sent();
                //console.log(comments.data[0].comment);
                response.data.push(comments.data[0].comment);
                _a.label = 4;
            case 4:
                index++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, { response: response }];
            case 6: throw new Error("".concat(post.error));
            case 7: return [3 /*break*/, 9];
            case 8:
                err_2 = _a.sent();
                return [2 /*return*/, { err: err_2.message }];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.getComment = getComment;
