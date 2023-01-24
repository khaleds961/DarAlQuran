import axios from 'axios';
 
const Api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});
 
export default Api;