import * as Api from './api.js';

export async function sendRegister(email, username, password) {
    const result = await Api.POST('/user/register', { 
        email: email,
        username: username,
        password: password
    });
    if (result === 'error') {
        alert('error registering');
        return;
    };
    alert('success registering');
    return result;
}

export async function sendLogin(email, password) {
    const result = await Api.POST('/user/login', { 
        email: email,
        password: password
    });
    if (result === 'error') {
        alert('error logging in');
        return;
    };
    alert('successful login');
    return result;
}

export function sendLogout() {
    // remove current user from local storage
    // send request to logout 
    return;
}
