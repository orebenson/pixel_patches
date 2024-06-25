import * as Api from '../api/api.js';

async function logoutUser() {
    const result = await Api.POST('/user/logout');
    if (result === 'error') {
        alert('error logging out');
        return null;
    };
    localStorage.removeItem('username');
    location.href = location.href;
}

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
                logoutUser();
            });

            loginNavItem.parentNode.insertBefore(logoutButton, loginNavItem.nextSibling);
        }
    }
}
