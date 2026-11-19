const express = require('express');
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/tasks', (req, res) => res.json(tasks));

app.post('/tasks', (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' });
  }
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'not found' });
  if (typeof req.body.title === 'string') task.title = req.body.title;
  if (typeof req.body.done === 'boolean') task.done = req.body.done;
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const i = tasks.findIndex(t => t.id === Number(req.params.id));
  if (i === -1) return res.status(404).json({ error: 'not found' });
  tasks.splice(i, 1);
  res.status(204).end();
});

module.exports = app;
