import axios from 'axios';
import Cookie from '../uti/Cookie';
import BackEndPoint from '../constant/BackEndPoint';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/action/AuthAction';
let url = 'http://localhost:5000'

if (process.env.REACT_APP_STAGE !== 'local') url = 'https://time-tracking-tool.herokuapp.com/api/v1'
const instance = axios.create({
    baseURL: url,
});
// // Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// // Also add/ configure interceptors && all the other cool stuff

// instance.interceptors.request...
instance.interceptors.request.use(
    (config) => {
        console.log("Interceptor Request.");
        const token = Cookie.getTokens();

        if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        console.log("Interceptor Response.");
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== BackEndPoint.LOGIN && err.response) {
            
            // Access Token was expired
            if (err.response.status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;
             
                console.log("Intercept response error When Access Token expire");
                try {
                    const rs = await instance.post(BackEndPoint.AUTH_TOKEN, {
                        refreshToken: Cookie.getLocalRefreshToken(),
                    });
                    const { accessToken } = rs.data;
                    Cookie.updateLocalAccessToken(accessToken);
                 
                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);
export default instance;
