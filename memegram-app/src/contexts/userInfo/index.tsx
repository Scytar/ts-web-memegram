import { createContext } from "react";

export interface IUserInfo {
    user: string | null,
    userId: string | null,
}

const defaultContextValue: IUserInfo ={
    userId: null,
    user: null,
};

const UserContext = createContext(defaultContextValue);

export { UserContext };