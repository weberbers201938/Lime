document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('usernameDisplay').innerText = user.username;
        document.getElementById('profileInfo').innerHTML = `
            <p>ID: ${user.id}</p>
            <p>Username: ${user.username}</p>
        `;
    }
});
