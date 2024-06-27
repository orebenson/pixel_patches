import * as LoginService from '../api/login-service.js';
import { loadNavbar } from '../utils/navbar-utils.js';


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        userid: params.get('id'),
        token: params.get('tk')
    };
}

function initNewPasswordForm() {
    const { userid, token } = getQueryParams();

    if (!userid || !token) {
        window.location.href = '/404';
        return;
    }

    const newPasswordForm = document.querySelector('#newpassword-container form');
    const newPasswordInputs = {
        password: newPasswordForm.querySelector('.passwordInput'),
        verifyPassword: newPasswordForm.querySelector('.verifyPasswordInput')
    };
    const newPasswordButton = newPasswordForm.querySelector('button[type="submit"]');

    function validateNewPasswordForm() {
        const isValidPassword = newPasswordInputs.password.value.trim().length >= 4;
        const isPasswordMatch = newPasswordInputs.password.value === newPasswordInputs.verifyPassword.value;

        newPasswordInputs.password.classList.toggle('invalid', !isValidPassword);
        newPasswordInputs.verifyPassword.classList.toggle('invalid', !isPasswordMatch);

        newPasswordButton.disabled = !(isValidPassword && isPasswordMatch);
    }

    Object.values(newPasswordInputs).forEach(input => {
        input.addEventListener('input', validateNewPasswordForm);
    });

    newPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await LoginService.sendNewPassword(userid, token, newPasswordInputs.password.value);
        if (result === 'error') return;
        LoginService.sendLogout();
        window.location.href = '/login';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    initNewPasswordForm();
});
