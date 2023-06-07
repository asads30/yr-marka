import axios from 'axios';

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': localStorage.getItem('userData')
    },
    responseType: 'arraybuffer'
})

export default axiosIns
