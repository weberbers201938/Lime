document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
    } else {
        const response = await fetch('/api/messages');
        const messages = await response.json();
        const messenger = document.getElementById('messenger');
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <h3>${message.username}</h3>
                <p>${message.content}</p>
                <small>${new Date(message.timestamp).toLocaleString()}</small>
            `;
            messenger.appendChild(messageElement);
        });

        const messageForm = document.getElementById('messageForm');
        messageForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const recipient = document.getElementById('recipient').value;
            const content = document.getElementById('messageContent').value;
            const response = await fetch('/api/sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: user.username, recipient, content })
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
