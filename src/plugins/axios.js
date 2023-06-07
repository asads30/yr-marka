import axios from 'axios';

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': JSON.parse(localStorage.getItem('userData')),
        'Content-type': 'application/json',
    },
    responseType: 'json',
    transformRequest: [function (data, headers) {
        
        return data;
    }],
})

export default axiosIns
