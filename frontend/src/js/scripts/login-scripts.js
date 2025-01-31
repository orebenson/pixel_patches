import * as LoginService from '../api/login-service.js';
import { loadNavbar } from '../utils/navbar-utils.js';

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetFormValidation(form, inputs) {
    Object.values(inputs).forEach(input => {
        input.classList.remove('invalid');
    });
}

function initRegisterForm() {
    const registerForm = document.querySelector('#register-container form');
    const registerInputs = {
        username: registerForm.querySelector('.usernameInput'),
        email: registerForm.querySelector('.emailInput'),
        verifyEmail: registerForm.querySelector('.verifyEmailInput'),
        password: registerForm.querySelector('.passwordInput'),
        verifyPassword: registerForm.querySelector('.verifyPasswordInput')
    };
    const registerButton = registerForm.querySelector('button[type="submit"]');

    function validateRegisterForm() {
        const isValidUsername = registerInputs.username.value.trim().length > 0 && /^[a-zA-Z0-9_-]+$/.test(registerInputs.username.value.trim());
        const isValidEmail = validateEmail(registerInputs.email.value);
        const isEmailMatch = registerInputs.email.value === registerInputs.verifyEmail.value;
        const isValidPassword = registerInputs.password.value.trim().length >= 4;
        const isPasswordMatch = registerInputs.password.value === registerInputs.verifyPassword.value;

        registerInputs.username.classList.toggle('invalid', !isValidUsername);
        registerInputs.email.classList.toggle('invalid', !isValidEmail);
        registerInputs.verifyEmail.classList.toggle('invalid', !isEmailMatch);
        registerInputs.password.classList.toggle('invalid', !isValidPassword);
        registerInputs.verifyPassword.classList.toggle('invalid', !isPasswordMatch);

        registerButton.disabled = !(isValidUsername && isValidEmail && isEmailMatch && isValidPassword && isPasswordMatch);
    }

    Object.values(registerInputs).forEach(input => {
        input.addEventListener('input', validateRegisterForm);
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await LoginService.sendRegister(registerInputs.email.value, registerInputs.username.value, registerInputs.password.value);
        if (result === 'error') return;
        window.location.href = '/login';
    });
}


function initLoginForm() {
    const loginForm = document.querySelector('#login-container form');
    const loginInputs = {
        email: loginForm.querySelector('.emailInput'),
        password: loginForm.querySelector('.passwordInput')
    };
    const loginButton = loginForm.querySelector('button[type="submit"]');

    function validateLoginForm() {
        const isValidEmail = validateEmail(loginInputs.email.value);
        const isValidPassword = loginInputs.password.value.trim().length > 0;

        loginInputs.email.classList.toggle('invalid', !isValidEmail);
        loginInputs.password.classList.toggle('invalid', !isValidPassword);


        loginButton.disabled = !(isValidEmail && isValidPassword);
    }

    Object.values(loginInputs).forEach(input => {
        input.addEventListener('input', validateLoginForm);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await LoginService.sendLogin(loginInputs.email.value, loginInputs.password.value);
        if (result === 'error') return;
        loadNavbar();
        window.location.href = '/';
    });
}

function initResetPasswordForm() {
    const resetPasswordForm = document.querySelector('#resetpassword-container form');
    const resetPasswordInputs = {
        email: resetPasswordForm.querySelector('.emailInput')
    };
    const resetPasswordButton = resetPasswordForm.querySelector('button[type="submit"]');

    function validateResetPasswordForm() {
        const isValidEmail = validateEmail(resetPasswordInputs.email.value);

        resetPasswordInputs.email.classList.toggle('invalid', !isValidEmail);

        resetPasswordButton.disabled = !(isValidEmail);
    }

    Object.values(resetPasswordInputs).forEach(input => {
        input.addEventListener('input', validateResetPasswordForm);
    });

    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const result = await LoginService.sendPasswordResetRequest(resetPasswordInputs.email.value);
        if (result === 'error') return;
        loadNavbar();
        window.location.href = '/login';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser && loggedInUser !== '') window.location.href = '/';
    initRegisterForm();
    initLoginForm();
    initResetPasswordForm();
});
