import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://18.222.20.15/'
});

export default instance;