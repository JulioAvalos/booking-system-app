import {http as axios} from '../axios';

export const bookingHistory = (userId: number) => {
    const url = `/api/v1/reservations/user/${userId}`;
    return axios.get(url, {
        headers: {'Content-Type': 'application/json'},
    });
};
