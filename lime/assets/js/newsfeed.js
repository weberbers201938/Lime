document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
    } else {
        const response = await fetch('/api/newsfeed');
        const posts = await response.json();
        const newsFeed = document.getElementById('newsFeed');
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.username}</h3>
                <p>${post.content}</p>
                <small>${new Date(post.timestamp).toLocaleString()}</small>
            `;
            newsFeed.appendChild(postElement);
        });

        const postForm = document.getElementById('postForm');
        postForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const content = document.getElementById('postContent').value;
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, content })
            });
            const result = await response.json();
            if (result.success) {
                location.reload();
            } else {
                alert(result.message);
            }
        });
    }
});
