import { isEmpty } from 'lodash';
import * as jwt_decode from 'jwt-decode';
// import {ACCESS_TOKEN} from "../constraints";

const ACCESS_TOKEN = 'accessToken';
const TOKEN_KEY = ACCESS_TOKEN;
const USER_INFO = 'userInfo';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {
    /**
     * Remove an item from the used storage
     * @param  {String} key [description]
     */
    clear(key) {
        if (localStorage && localStorage.getItem(key)) {
            return localStorage.removeItem(key);
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            return sessionStorage.removeItem(key);
        }

        return null;
    },

    /**
     * Clear all app storage
     */
    clearAppStorage() {
        if (localStorage) {
            localStorage.clear();
        }

        if (sessionStorage) {
            sessionStorage.clear();
        }
    },

    clearToken(tokenKey = TOKEN_KEY) {
        return auth.clear(tokenKey);
    },

    clearUserInfo(userInfo = USER_INFO) {
        return auth.clear(userInfo);
    },

    /**
     * Returns data from storage
     * @param  {String} key Item to get from the storage
     * @return {String|Object}     Data from the storage
     */
    get(key) {
        console.log("key: " + key);
        if (localStorage && localStorage.getItem(key)) {
            console.log("tukaa" + localStorage.getItem(key))
            return JSON.parse(localStorage.getItem(key)) || null;
        }

        if (sessionStorage && sessionStorage.getItem(key)) {
            console.log("tukaa" + sessionStorage.getItem(key))
            return JSON.parse(sessionStorage.getItem(key)) || null;
        }

        return null;
    },

    getToken(tokenKey = TOKEN_KEY) {
        return auth.get(tokenKey);
    },

    getUserInfo(userInfo = USER_INFO) {
        return auth.get(userInfo);
    },

    /**
     * Set data in storage
     * @param {String|Object}  value    The data to store
     * @param {String}  key
     * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
     */
    set(value, key, isLocalStorage) {
        if (isEmpty(value)) {
            return null;
        }

        if (isLocalStorage && localStorage) {
            return localStorage.setItem(key, stringify(value));
        }

        if (sessionStorage) {
            return sessionStorage.setItem(key, stringify(value));
        }

        return null;
    },

    setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
        return auth.set(value, tokenKey, isLocalStorage);
    },

    setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
        return auth.set(value, userInfo, isLocalStorage);
    },
    getDecodedAccessToken(token) {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    },
};

export default auth;