import {http as axios} from '../axios';

export const loginUser = (email: string, password: string) => {
    const url = `/api/v1/auth/login`;
    return axios.post(url, {
        email: email,
        password: password
    }, {
        headers: {'Content-Type': 'application/json'},
    });
};
