import {createContext} from "react";

interface ContextProps {
    isLoggedIn: boolean;
    user?: any; //todo: por definir el tipo de usuario
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    verifyLogin: () => any | null; //todo: por definir el tipo de usuario
    // verifyToken: (token: string, userCode: string) => Promise<boolean>;
    isOpen: boolean;
    displayModal: (message: string) => void;
    modalMessage?: string;
    closeModal: () => void;
}

export const AuthContext = createContext({} as ContextProps);
