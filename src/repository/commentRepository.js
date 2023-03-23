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
dotenv.config();
var MONGODB_DSN = "mongodb://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PSW, "@").concat(process.env.MONGO_HOST, ":").concat(process.env.MONGO_PORT, "/").concat(process.env.MONGO_DB, "?retryWrites=true&w=majority");
var commentSchem = new mongoose_1["default"].Schema({
    commentId: {
        type: String,
        unique: true
    },
    comment: {
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    },
    created_at: Date
});
var commentModel = mongoose_1["default"].model('comment', commentSchem);
var CommentRepository = /** @class */ (function () {
    function CommentRepository() {
    }
    CommentRepository.prototype.insert = function (commentData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, newComment, _a, err_1;
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
                        newComment = new commentModel({
                            commentId: (0, uuid_1.v4)(),
                            comment: {
                                author: commentData.author,
                                text: commentData.text
                            },
                            created_at: Date.now()
                        });
                        _a = resp;
                        return [4 /*yield*/, newComment.save()];
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
    CommentRepository.prototype.listBy = function (query) {
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
                        return [4 /*yield*/, commentModel.find(query)];
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
    return CommentRepository;
}());
exports["default"] = CommentRepository;