import {ReactNode, useReducer} from "react";
import {AuthContext} from "./AuthContext";
import {Actions, authReducer} from "./authReducer";
import {randomColorAvatar} from "../utils/util";

export interface IProps {
    children: ReactNode;
}

const initialState = {
    isLoggedIn: false,
    user: undefined,
    isOpen: false,
}

export const AuthProvider = ({children}: IProps) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const login = async (username: string, password: string) => {
        console.log('values', username, password);
        const userData = {
            username: username,
            firstName: 'Julio',
            lastName: 'Avalos',
            role: 'user',
            area: 'FABRICA DIGITAL - TRANSFORMACION DIGITAL',
            email: 'julio.avalos@bancocuscatlan.com',
            color: randomColorAvatar()
        }
        localStorage.setItem('access_token', JSON.stringify({...userData}));
        dispatch({type: Actions.AUTH_LOGIN, payload: {...userData}});
        return true;
    }

    const verifyLogin = () => {
        const userData = localStorage.getItem('access_token') || '';
        if (userData) {
            const result = JSON.parse(userData);
            dispatch({type: Actions.AUTH_LOGIN, payload: {...result}});
            return result;
        } else {
            return null;
        }
    }

    const displayModal = (message: string) => {
        dispatch({
            type: Actions.MODAL_UPDATE,
            payload: {
                isOpen: true,
                modalMessage: message
            }
        })
    }

    const closeModal = () => {
        dispatch({
            type: Actions.MODAL_UPDATE,
            payload: {
                isOpen: false,
                modalMessage: ''
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        dispatch({type: Actions.AUTH_LOGOUT});
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                verifyLogin,
                displayModal,
                closeModal
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
