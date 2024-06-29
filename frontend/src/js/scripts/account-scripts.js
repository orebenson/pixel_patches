import { sendLogout } from "../api/login-service.js";
import { loadNavbar } from '../utils/navbar-utils.js';

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();

    const loggedInUser = localStorage.getItem('username');
    if (!loggedInUser || loggedInUser === '') window.location.href = '/login';

    const usernameDisplay = document.querySelector('#logged-in-user-h1');
    usernameDisplay.innerText = `@${loggedInUser}`;

    const logoutButton = document.querySelector('#logout-button');
    logoutButton.addEventListener('click', function (event) {
        event.preventDefault();
        sendLogout();
    });

    
});
