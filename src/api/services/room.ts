import {http as axios} from '../axios';

export const roomListByName = (searchWord: string, page?: number) => {

    const defaultPage = page ? page : 1;
    const word = searchWord !== null ? searchWord : '';

    let queryParam = '';

    if (word !== '') {
        queryParam += `&name=${word}`;
    }

    const url = `/api/v1/rooms?page=${defaultPage}&limit=5` + queryParam;

    return axios.get(url, {
        headers: {'Content-Type': 'application/json'},
    });
};
