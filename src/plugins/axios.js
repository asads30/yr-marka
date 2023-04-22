import axios from 'axios'

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': '{"id":386567097,"first_name":"Asadbek","last_name":"Ibragimov","username":"wpbrouz","photo_url":"https://t.me/i/userpic/320/b248QbnE_-rsrFViKQWCha8H8NDHaMOGDkPyZsP7PdI.jpg","auth_date":1682190094,"hash":"b872e5e05dcfdd0a265a4904f2521638a9020cac6a59058a2efea3e103301362"}'
    }
})

export default axiosIns
