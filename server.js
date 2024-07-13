const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('lime'));

const dbPath = path.join(__dirname, 'lime', 'db', 'database.json');

// Helper function to read the database
const readDatabase = () => {
    return JSON.parse(fs.readFileSync(dbPath));
};

// Helper function to write to the database
const writeDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = readDatabase();
    const user = db.users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

// Endpoint to handle sign-up
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    const db = readDatabase();
    const userExists = db.users.some(user => user.username === username);

    if (userExists) {
        res.json({ success: false, message: 'Username already exists' });
    } else {
        const newUser = { id: Date.now(), username, password };
        db.users.push(newUser);
        writeDatabase(db);
        res.json({ success: true, user: newUser });
    }
});

// Endpoint to fetch newsfeed
app.get('/api/newsfeed', (req, res) => {
    const db = readDatabase();
    res.json(db.posts);
});

// Endpoint to handle posting
app.post('/api/post', (req, res) => {
    const { username, content } = req.body;
    const db = readDatabase();
    const newPost = { id: Date.now(), username, content, timestamp: Date.now() };
    db.posts.push(newPost);
    writeDatabase(db);
    res.json({ success: true, post: newPost });
});

// Endpoint to fetch messages
app.get('/api/messages', (req, res) => {
    const db = readDatabase();
    res.json(db.messages);
});

// Endpoint to handle sending messages
app.post('/api/sendMessage', (req, res) => {
    const { username, recipient, content } = req.body;
    const db = readDatabase();
    const recipientExists = db.users.some(user => user.username === recipient);

    if (!recipientExists) {
        res.json({ success: false, message: 'Recipient does not exist' });
    } else {
        const newMessage = { id: Date.now(), username, recipient, content, timestamp: Date.now() };
        db.messages.push(newMessage);
        writeDatabase(db);
        res.json({ success: true, message: newMessage });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
