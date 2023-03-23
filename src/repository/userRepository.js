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
var userSchem = new mongoose_1["default"].Schema({
    userId: {
        type: String,
        unique: true
    },
    user: {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
});
var userModel = mongoose_1["default"].model('user', userSchem);
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.insert = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, newUser, _a, err_1;
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
                        newUser = new userModel({
                            userId: (0, uuid_1.v4)(),
                            user: {
                                name: userData.name,
                                email: userData.email,
                                password: userData.password
                            },
                            created_at: Date.now(),
                            updated_at: null,
                            deleted_at: null
                        });
                        _a = resp;
                        return [4 /*yield*/, newUser.save()];
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
    UserRepository.prototype.listAll = function () {
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
                        return [4 /*yield*/, userModel.find()];
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
    UserRepository.prototype.listBy = function (query) {
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
                        return [4 /*yield*/, userModel.find(query)];
                    case 3:
                        _a.data = _b.sent();
                        if (!resp.data) {
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
    UserRepository.prototype.update = function (updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, err_4;
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
                        updateData.content.updated_at = Date.now();
                        _a = resp;
                        return [4 /*yield*/, userModel.findOneAndUpdate(updateData.query, updateData.content, { "new": true })];
                    case 3:
                        _a.data = _b.sent();
                        if (!resp.data) {
                            resp.error = "Error: not found";
                        }
                        return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _b.sent();
                        resp.error = err_4.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, resp];
                }
            });
        });
    };
    UserRepository.prototype.deleteBy = function (deleteData) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, _a, err_5;
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
                        return [4 /*yield*/, userModel.findOneAndDelete(deleteData.query, { "new": true })];
                    case 3:
                        _a.data = _b.sent();
                        if (resp.data) {
                            resp.data = "Usuario ".concat(resp.data.user.name, " / ").concat(resp.data.user.email, " foi deletado!");
                        }
                        else {
                            resp.error = "Error: not found";
                        }
                        return [4 /*yield*/, mongoose_1["default"].connection.close()];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_5 = _b.sent();
                        resp.error = err_5.message;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, resp];
                }
            });
        });
    };
    return UserRepository;
}());
exports["default"] = UserRepository;
