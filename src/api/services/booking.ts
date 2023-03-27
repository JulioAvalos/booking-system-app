import {http as axios} from '../axios';

export const bookingHistory = (userId: number) => {
    const url = `/api/v1/reservations/user/${userId}`;
    return axios.get(url, {
        headers: {'Content-Type': 'application/json'},
    });
};

export const createBooking = (formData: any) => {
    const url = `/api/v1/reservations`;
    return axios.post(url, formData, {
        headers: {'Content-Type': 'application/json'},
    });
}


export const cancelBooking = (id: number) => {
    const url = `/api/v1/reservations/${id}/cancel`;
    return axios.post(url, {
        headers: {'Content-Type': 'application/json'},
    });
}
