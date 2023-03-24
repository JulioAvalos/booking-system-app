export enum Actions {
    AUTH_LOGIN = '[Auth] - Login',
    AUTH_LOGOUT = '[Auth] - Logout',
    MODAL_UPDATE = '[Modal] - Update State'
}


type AuthActionType =
    | { type: Actions.AUTH_LOGIN, payload: any }
    | { type: Actions.AUTH_LOGOUT }
    | { type: Actions.MODAL_UPDATE, payload: { isOpen: boolean, modalMessage: string } }

export interface AuthState {
    isLoggedIn: boolean;
    user?: any;
    isOpen: boolean;
    modalMessage?: string;
}

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case Actions.AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }
        case Actions.AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
            }
        case Actions.MODAL_UPDATE:
            return {
                ...state,
                isOpen: action.payload.isOpen,
                modalMessage: action.payload.modalMessage
            }
        default:
            return state;
    }

}
