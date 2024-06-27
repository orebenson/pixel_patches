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

export async function sendLogout() {
    const result = await Api.POST('/user/logout');
    if (result === 'error') {
        alert('error logging out');
        return null;
    };
    localStorage.removeItem('username');
    location.href = location.href;
}

export async function sendPasswordResetRequest(email) {
    const result = await Api.POST('/user/resetpassword', {
        email: email
    });
    if (result === 'error') {
        alert('error sending password reset request');
        return null;
    };
    alert('reset request sent');
    return result;
}



export async function sendNewPassword(userid, token, password) {
    const result = await Api.POST('/user/newpassword', {
        userid: userid,
        token: token,
        password: password
    });
    if (result === 'error') {
        alert('error sending password');
        return null;
    };
    alert('new password sent');
    return result;
}
