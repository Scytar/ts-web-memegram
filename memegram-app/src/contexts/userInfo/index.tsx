import { createContext } from "react";

export interface IUserInfo {
    user: string | null;
    token: string | null,
    userId: string | null,
}

const defaultContextValue: IUserInfo ={
    token: null,
    userId: null,
    user: null,
};

const UserContext = createContext(defaultContextValue);

export { UserContext };