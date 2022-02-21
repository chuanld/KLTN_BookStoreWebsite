import { dispatch } from '../app/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StorageKeys } from '../constant/storageKey';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

axiosClient.interceptors.request.use(
    (config) => {
        //Do something before send request
        const URLS = [
            '/user/register',
            '/user/login',
            '/user/infor',
            '/user/refresh_token',
            '/user/all_infor',
            '/user/addtocart',
            '/user/order_infor',
            '/api/order',
        ];

        const dynamicURL = [
            //dynamic URL
            '/user/addtocart'

        ]
        const dynamicURLNeedToken = dynamicURL.some(item => {
            return config.url.includes(item)
        })

        if (URLS.includes(config.url) || dynamicURLNeedToken) {
            const token = localStorage.getItem(StorageKeys.TOKEN);
            config.headers.Authorization = token ? `${token}` : '';
        }

        // const URLADMIN = []
        return config;

    },
    (error) => {
        return Promise.reject(error)
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        console.log("OK")
        return response.data
    },
    async (err) => {
        const originalConfig = err.config;
        console.warn("Error status: ", err.response.status);
        if (err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    console.log("Getting new token ...")
                    // await refreshToken();
                    return axiosClient(originalConfig)
                } catch (_error) {
                    if (_error.response && _error.response.data) {
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            return Promise.reject(err)
        }
    }
)

// const refreshToken = async () => {
//     const firstLogin = localStorage.getItem("firstLogin");
//     if (firstLogin) {
//       const res = await axios.get("/user/refresh_token");
//       localStorage.setItem("token", res.data.accesstoken);
//       setToken(localStorage.getItem("token"));
//       console.log(res.data.accesstoken);
//     }
//   };

export default axiosClient;