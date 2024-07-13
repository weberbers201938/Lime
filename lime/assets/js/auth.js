document.addEventListener('DOMContentLoaded', () => {
    // Function to handle login
    const handleLogin = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'newsfeed.html';
        } else {
            alert(result.message);
        }
    };

    // Function to handle sign-up
    const handleSignup = async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const result = await response.json();
        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'newsfeed.html';
        } else {
            alert(result.message);
        }
    };

    // Determine the current page and assign the appropriate handler
    const currentPage = window.location.pathname;
    if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) {
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', handleLogin);
    } else if (currentPage.endsWith('signup.html')) {
        const signupForm = document.getElementById('signupForm');
        signupForm.addEventListener('submit', handleSignup);
    }
});
