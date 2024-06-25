import * as LoginService from '../js/api/loginService.js';
import { loadNavbar } from './utils/navbar-utils.js';

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetFormValidation(form, inputs) {
    Object.values(inputs).forEach(input => {
        input.classList.remove('invalid');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Registration form validation
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
        const isValidUsername = registerInputs.username.value.trim().length > 0;
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
        if(result === 'error') return;
        window.location.href = '/';
    });

    // Login form validation
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
        if(result === 'error') return;
        loadNavbar();
        window.location.href = '/';
    });

    // document.addEventListener('click', function(event) {
    //     if (!registerForm.contains(event.target)) {
    //         resetFormValidation(registerForm, registerInputs);
    //     }
    //     if (!loginForm.contains(event.target)) {
    //         resetFormValidation(loginForm, loginInputs);
    //     }
    // });

});
