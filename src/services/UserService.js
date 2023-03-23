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
exports.selectUser = exports.createUser = void 0;
//Business rules for user
var index_1 = require("../interfaces/index");
var dotenv = require("dotenv");
dotenv.config();
var jsonwebtoken_1 = require("jsonwebtoken");
var bcrypt_1 = require("bcrypt");
var userRepository_1 = require("../repository/userRepository");
var secret = 'xfeyi356##$qsWRE';
var createUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedPasswd, dataUser, userRep, response, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                //registration data validation
                new index_1.EmailValidator(data.email);
                new index_1.NameValidator(data.name);
                new index_1.PasswordValidator(data.password);
                return [4 /*yield*/, bcrypt_1["default"].hash(data.password, 10)];
            case 1:
                encryptedPasswd = _a.sent();
                dataUser = {
                    name: data.name,
                    email: data.email,
                    password: encryptedPasswd
                };
                userRep = new userRepository_1["default"]();
                return [4 /*yield*/, userRep.insert({ name: dataUser.name, email: dataUser.email, password: dataUser.password })];
            case 2:
                response = _a.sent();
                //---------------------------------------------------------------------------verify
                if (!response.error) {
                    token = jsonwebtoken_1["default"].sign({
                        id: response.data.userId,
                        name: response.data.user.name,
                        email: response.data.user.email
                    }, secret, { expiresIn: "1d" });
                    response.data = { "userId": response.data.userId, "user": response.data.user.name };
                    return [2 /*return*/, { response: response, token: token }];
                }
                else {
                    throw new Error("".concat(response.error));
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                return [2 /*return*/, { err: err_1.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var selectUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var emailUser, password, userRep, response, compare, token, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                new index_1.EmailValidator(data.email);
                new index_1.PasswordValidator(data.password);
                emailUser = data.email;
                password = data.password;
                userRep = new userRepository_1["default"]();
                return [4 /*yield*/, userRep.listBy({ "user.email": emailUser })];
            case 1:
                response = _a.sent();
                if (!!response.error) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1["default"].compare(password, response.data[0].user.password)];
            case 2:
                compare = _a.sent();
                if (!compare)
                    throw new Error("Error: Incorrect data");
                token = jsonwebtoken_1["default"].sign({
                    id: response.data[0].userId,
                    name: response.data[0].user.name,
                    email: data.email
                }, secret, { expiresIn: "1d" });
                response.data = { "userId": response.data[0].userId, "user": response.data[0].user.name };
                return [2 /*return*/, { response: response, token: token }];
            case 3: throw new Error("".concat(response.error));
            case 4: return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                return [2 /*return*/, { err: err_2.message }];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.selectUser = selectUser;
