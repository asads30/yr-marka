import axios from 'axios'

const axiosIns = axios.create({
    baseURL: '/admin',
    timeout: 5000,
    headers: { 
        'Authorization': '{"id":386567097,"first_name":"Asadbek","last_name":"Ibragimov","username":"wpbrouz","photo_url":"https://t.me/i/userpic/320/b248QbnE_-rsrFViKQWCha8H8NDHaMOGDkPyZsP7PdI.jpg","auth_date":1681850051,"hash":"0cf140d0db1abde019aaf055a8a8635d89d50f07aec200f916cbac4d1740531f"}'
    }
})

export default axiosIns
