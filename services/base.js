import { AsyncStorage } from 'react-native';



const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';
const HEROKU_URL = 'https://covalence-final.herokuapp.com';

function setAuthToken(token) {
    authToken = `Bearer ${token}`;
    if (AsyncStorage) {
        AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
    }
}

function clearAuthToken() {
    authToken = '';
    if (AsyncStorage) {
        AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    }
}

// function populateAuthToken() {
//     let token = AsyncStorage.getItem(AUTH_TOKEN_KEY);
//     if (token && token !== null) {
//         authToken = token;
//         return true;
//     } else {
//         return false;
//     }
// }

function populateAuthToken() {
    AsyncStorage.getItem(AUTH_TOKEN_KEY)
    .then((token) => {
        if (token && token !== null) {
            authToken = token;
            return true;
        }
    }).catch((err) => {return false});
}

function makeFetch(url, info) {
    return fetch(`${HEROKU_URL}${url}`, info);
}

function json(url, method = 'GET', payload = {}) {
    let data = {
        method,
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': authToken
        })
    };

    if (method === 'GET') {
        delete data.body;
    }
    
    return makeFetch(url, data)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                let contentType = response.headers.get('Content-Type');

                if (contentType.indexOf('application/json') > -1) {
                    return response.json();
                }

                return response.statusText;
            }

            throw response;
        });
}

function get(url) {
    return json(url);
}

function post(url, payload) {
    return json(url, 'POST', payload);
}

function put(url, payload) {
    return json(url, 'PUT', payload);
}

function destroy(url, payload) {
    return json(url, 'DELETE', payload);
}

export {
    setAuthToken,
    populateAuthToken,
    clearAuthToken,
    get,
    post,
    put,
    destroy,
    makeFetch
};