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
    if (error.response && error.response.status === 401) {
        localStorage.removeItem('userData')
        localStorage.removeItem('accessToken')
        router.push('/login').then(() => {
          localStorage.removeItem('userAbilities')
          ability.update(initialAbility)
        })
    }
    return Promise.reject(error.response.data);
});

export default axiosIns
