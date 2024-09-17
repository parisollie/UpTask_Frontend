import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
//Vid 574
api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api