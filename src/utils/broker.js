import axios from "axios";

import config from "./config";

var token = window.localStorage.getItem('token');

const CancelToken = axios.CancelToken;
let cancel;

const instance = axios.create({
    baseURL: config.api_endpoint,
    timeout: 20000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    cancelToken: new CancelToken(function executor(c) {
        cancel = c;
    }),
});

const instanceRocketChat = axios.create({
    baseURL: config.api_endpoint_rocketchat,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    cancelToken: new CancelToken(function executor(c) {
        cancel = c;
    }),
});





const checkUserIdentity = () => {
    return instance
        .get('/helper/user_identity')
        .then(res => {
            const { status, data } = res;
            if (status === 200) {
                return {
                    status: true,
                    user: data,
                }
            } else {
                return {
                    status: false,
                    error: data,
                }
            }
        })
        .catch(err => {
            return {
                status: false,
                error: err,
            }
        });
}
 
const setToken = (token) => {
    window.localStorage.setItem('token', token);
    instance.defaults.headers.Authorization = `Bearer ${token}`;
}

const setTokenRocketChat = (authToken,userId) => {
    window.localStorage.setItem('authTokenRocketChat', authToken);
    window.localStorage.setItem('userIdRocketChat', userId);
}

const logout = () => {
    token = null;
    window.localStorage.clear();
}

export default {
    fetch: instance,
    fetchRocketChat: instanceRocketChat,
    setToken,
    logout,
    setTokenRocketChat,
    checkUserIdentity,
    cancel,
}