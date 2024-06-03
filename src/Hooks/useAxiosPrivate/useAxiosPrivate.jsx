import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPrivate = () => {
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log(token)
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    });


    axios.interceptors.response.use(function (response) {
        return response;
    },async (err) => {
            const status = err.response.status
            if (status === 401 || status === 403) {
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error);
        });

    return axiosPrivate
};

export default useAxiosPrivate;