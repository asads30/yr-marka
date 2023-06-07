import axios from 'axios';

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': JSON.stringify(localStorage.getItem('userData')),
        'Content-type': 'application/json',
    },
    responseType: 'json',
    responseEncoding: 'utf8'
})

export default axiosIns
