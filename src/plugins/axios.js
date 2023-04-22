import axios from 'axios'

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': '{"id":386567097,"first_name":"Asadbek","last_name":"Ibragimov","username":"wpbrouz","photo_url":"https://t.me/i/userpic/320/b248QbnE_-rsrFViKQWCha8H8NDHaMOGDkPyZsP7PdI.jpg","auth_date":1682198993,"hash":"6d8561e747446267945d12b944087b123a8cdf7509303b5112298a5463f9f0ff"}'
    }
})

export default axiosIns
