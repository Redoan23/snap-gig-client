import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosPrivate = () => {
    axios.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log(token)
        config.headers.Authorization = `bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    return axiosPrivate
};

export default useAxiosPrivate;