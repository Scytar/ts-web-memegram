"use strict";
//interfaces e validação de dados
exports.__esModule = true;
exports.EmailValidator = exports.PasswordValidator = exports.NameValidator = void 0;
var EmailValidator = /** @class */ (function () {
    function EmailValidator(data) {
        var regexCode = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        var validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Formato de dado inválido!");
        }
    }
    Object.defineProperty(EmailValidator.prototype, "regex", {
        get: function () {
            return new RegExp("/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim");
        },
        enumerable: false,
        configurable: true
    });
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;
var PasswordValidator = /** @class */ (function () {
    function PasswordValidator(data) {
        var regexCode = /^\w{1,}$/;
        var validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Formato de dado inválido!");
        }
    }
    Object.defineProperty(PasswordValidator.prototype, "regex", {
        get: function () {
            return new RegExp("/^\w{1,}$/");
        },
        enumerable: false,
        configurable: true
    });
    return PasswordValidator;
}());
exports.PasswordValidator = PasswordValidator;
var NameValidator = /** @class */ (function () {
    function NameValidator(data) {
        var regexCode = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        var validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Formato de dado inválido!");
        }
    }
    Object.defineProperty(NameValidator.prototype, "regex", {
        get: function () {
            return new RegExp("/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim");
        },
        enumerable: false,
        configurable: true
    });
    return NameValidator;
}());
exports.NameValidator = NameValidator;
