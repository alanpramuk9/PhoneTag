import * as baseService from './base';

let loggedIn = false;

function isLoggedIn() {
    if (baseService.populateAuthToken()) {
        loggedIn = true;
    }
    return loggedIn;
}

function whoIsThis(id) {
    return baseService.get(`/api/players/${id}`)
    .then((player) => {
        delete player.hash;
        return player
    }).catch((err) => {
        console.log(err);
    })
}

function checkLogin() {
    if (loggedIn) {
        return Promise.resolve(true);
    } else {
        baseService.populateAuthToken();
        return me()
        .then((user) => {
            loggedIn = true;
            return Promise.resolve(true);
        }).catch(() => {
            return Promise.resolve(false);
        });
    }
}

function login(email, password) {
    return baseService.makeFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        console.log('login success');
        if (response.ok) {
            return response.json()
            .then((jsonResponse) => {
                baseService.setAuthToken(jsonResponse.token);
                loggedIn = true;
            });
        } else if (response.status === 401) {
            return response.json()
            .then((jsonResponse) => {
                throw jsonResponse;
            });
        }
    });
}

function logout() {
    baseService.clearAuthToken();
    loggedIn = false;
}

function me() {
    return baseService.get('/api/players/me');
}

function profile() {
    return me()
        .then((player) => {
            delete player.hash;
            return player
        }).catch((err) => {
            console.log(err);
        })
}

function newUser(name, email, username, hash) {
    return baseService.post('/api/auth/signup', {name, email, username, hash})
}

function editEmail(id, email) {
    return baseService.put(`/api/players/email/${id}`, { email })
}

function checkPassword(id, password) {
    return baseService.post(`/api/players/checkpassword/${id}`, { password })
}

function editPassword(id, hash) {
    return baseService.put(`/api/players/password/${id}`, { hash })
}

function editPhoto(id, photo) {
    return baseService.put(`/api/players/photo/${id}`, { photo })
}

export { isLoggedIn, checkLogin, login, logout, newUser, me, profile, editEmail, checkPassword, editPassword, editPhoto, whoIsThis };
