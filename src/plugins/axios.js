import axios from 'axios';
const router = useRouter()

const axiosIns = axios.create({
    baseURL: '/admin/',
    timeout: 5000,
    headers: { 
        'Authorization': localStorage.getItem('userData')
    },
    responseType: 'json'
})

axiosIns.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 401) {
        try {
            localStorage.removeItem('userData')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('userAbilities')
        } catch (error) {
            console.log(error)
        }
        router.push('/login');
    }
    return Promise.reject(error.response.data);
});

export default axiosIns
