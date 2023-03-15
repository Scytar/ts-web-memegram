//interfaces e validação de dados

class EmailValidator {
    constructor(data: any) {
        const regexCode = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Formato de dado inválido!");
        }
    }
    get regex() {
        return new RegExp("/^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim");
    }
}

class PasswordValidator {
    constructor(data: any) {
        const regexCode = /^\w{1,}$/;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Formato de dado inválido!");
        }
    }
    get regex() {
        return new RegExp("/^\w{1,}$/");
    }
}

class NameValidator {
    constructor(data: any) {
        const regexCode = /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Formato de dado inválido!");
        }
    }
    get regex() {
        return new RegExp("/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim");
    }
}

interface User {
    id?: string,
    name?: string,
    email?: string,
    password?: string
}

interface Post{
    authorId?: string,
    author?: string,
    media?: string
}

export { User, Post, NameValidator, PasswordValidator, EmailValidator };