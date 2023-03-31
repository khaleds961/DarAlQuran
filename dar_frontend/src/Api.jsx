import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'http://192.168.1.80:8000/api',
    // baseURL: 'http://192.168.0.103:8000/api',
    // baseURL: 'http://172.20.10.2/api',
    // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export default Api;