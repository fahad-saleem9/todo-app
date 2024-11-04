const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000; // Choose a port

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Sample in-memory data store
let todos = [];

// Routes
app.get('/tasks', (req, res) => {
    res.json(todos);
});

app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), name: req.body.name, completed: false };
    todos.push(newTask);
    res.json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = todos.find(todo => todo.id === taskId);
    if (task) {
        task.name = req.body.name;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== taskId);
    res.sendStatus(204); // No content
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
