import {createContext} from "react";

export interface IUserToken {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    area: string;
    email: string;
    color: string;
    iat: number;
    exp: number;
}


interface ContextProps {
    isLoggedIn: boolean;
    user?: IUserToken | null | undefined | any;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    verifyLogin: () => IUserToken | null;
    isOpen: boolean;
    displayModal: (message: string) => void;
    modalMessage?: string;
    closeModal: () => void;

}

export const AuthContext = createContext({} as ContextProps);
