const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define Todo schema
const todoSchema = new mongoose.Schema({
  title: String,
  link: String,
  iconUrl: String,
  note: String,
  date: { type: Date, default: Date.now },
  checked: { type: Boolean, default: false }
});

// Create Todo model
const Todo = mongoose.model('Todo', todoSchema);

// GET all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single todo by id
router.get('/todos/:id', getTodo, (req, res) => {
  res.json(res.todo);
});

// CREATE a new todo
router.post('/todos', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    link: req.body.link,
    iconUrl: req.body.iconUrl,
    note: req.body.note
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a todo by id
router.patch('/todos/:id', getTodo, async (req, res) => {
  if (req.body.title != null) {
    res.todo.title = req.body.title;
  }
  if (req.body.link != null) {
    res.todo.link = req.body.link;
  }
  if (req.body.iconUrl != null) {
    res.todo.iconUrl = req.body.iconUrl;
  }
  if (req.body.note != null) {
    res.todo.note = req.body.note;
  }
  if (req.body.checked != null) {
    res.todo.checked = req.body.checked;
  }

  try {
    const updatedTodo = await res.todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a todo by id
router.delete('/todos/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove();
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a single todo by id
async function getTodo(req, res, next) {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.todo = todo;
  next();
}

module.exports = router;
