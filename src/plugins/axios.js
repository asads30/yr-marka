import axios from 'axios';

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': localStorage.getItem('userData')
    },
    responseType: 'json',
    transformRequest: [function (data, headers) {
        console.log(headers);
        console.log(data);
        return data;
    }],
})

export default axiosIns
