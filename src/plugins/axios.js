import axios from 'axios';

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': JSON.parse(localStorage.getItem('userData')),
        'Content-type': 'application/json',
    },
    responseType: 'json',
    responseEncoding: 'utf8',
    transformRequest: [function (data, headers) {
        let val = localStorage.getItem('userData');
        console.log(val);
        return data;
    }],
})

export default axiosIns
