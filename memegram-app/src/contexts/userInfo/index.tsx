import { createContext } from "react";

export interface IUserInfo {
    token: string | null,
    userId: string | null,
}

const defaultContextValue: IUserInfo ={
    token: null,
    userId: null
};

const UserContext = createContext(defaultContextValue);

export { UserContext };