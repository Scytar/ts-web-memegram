//interfaces e validação de dados

class EmailValidator {
    constructor(data: any) {
        const regexCode = /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
        const validator = regexCode.test(data);
        if (!validator) {
            throw new Error("Invalid email format!");
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
            throw new Error("Invalid password format!");
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
            throw new Error("Invalid name format!");
        }
    }
    get regex() {
        return new RegExp("/^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim");
    }
}

interface User {
    userId?: string | null
    id?: string,
    name?: string,
    email?: string,
    password?: string
}

interface Post {
    authorId?: string,
    author?: string,
    media?: string
}

interface Comment {
    postId?: string,
    comment?: {
        author?: string,
        text?: string
    }
}

interface Like {
    postId?: string,
    userId?: string
}

export { User, Post, Comment, Like, NameValidator, PasswordValidator, EmailValidator };