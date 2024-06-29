export function loadNavbar() {
    const loggedInUser = localStorage.getItem('username');
    const loginNavItem = document.querySelector('#login');
    if (loggedInUser && loggedInUser !== '') {
        loginNavItem.innerText = `@${loggedInUser}`;
        loginNavItem.href = "/account";
    } else {
        loginNavItem.innerText = `login`;
        loginNavItem.href = "/login";
    }
}
