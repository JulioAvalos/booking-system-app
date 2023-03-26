import {ReactNode, useReducer} from "react";
import {AuthContext} from "./AuthContext";
import {Actions, authReducer} from "./authReducer";
import {getParsedJwt, randomColorAvatar} from "../utils/util";
import {loginUser} from "../api/services/login";

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
    const login = async (email: string, password: string) => {
        try {
            const resp = await loginUser(email, password);
            const token = getParsedJwt(resp.data.data);
            localStorage.setItem('access_token', JSON.stringify(token));
            dispatch({type: Actions.AUTH_LOGIN, payload: {...token}});
            return true;
        } catch (err) {
            return false;
        }
        // console.log('values', username, password);
        // //todo: refactorizar llamada
        // const userData = {
        //     username: username,
        //     firstName: 'Julio',
        //     lastName: 'Avalos',
        //     role: 'user',
        //     area: 'FABRICA DIGITAL - TRANSFORMACION DIGITAL',
        //     email: 'julio.avalos@bancocuscatlan.com',
        //     color: randomColorAvatar()
        // }
        // localStorage.setItem('access_token', JSON.stringify({...userData}));
        // dispatch({type: Actions.AUTH_LOGIN, payload: {...userData}});
        // return true;
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
