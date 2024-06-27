import { sendLogout } from "../api/login-service.js";

export function loadNavbar() {
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser && loggedInUser !== '') {
        const loginNavItem = document.querySelector('#login');
        loginNavItem.innerText = loggedInUser;
        loginNavItem.href = "#";
        if (!document.querySelector('#logout')) {

            const logoutButton = document.createElement('a');
            logoutButton.href = "#";
            logoutButton.innerText = "logout";
            logoutButton.id = "logout";
            logoutButton.addEventListener('click', function (event) {
                event.preventDefault();
                sendLogout();
            });

            loginNavItem.parentNode.insertBefore(logoutButton, loginNavItem.nextSibling);
        }
    }
}
