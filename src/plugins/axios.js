import axios from 'axios'

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': '{"id":386567097,"first_name":"Asadbek","last_name":"Ibragimov","username":"wpbrouz","photo_url":"https://t.me/i/userpic/320/b248QbnE_-rsrFViKQWCha8H8NDHaMOGDkPyZsP7PdI.jpg","auth_date":1681930885,"hash":"2af732f06dae5df82566b031c462513015d2fcf8fc3aeb09d0592d4becbbb5dc"}'
    }
})

export default axiosIns
