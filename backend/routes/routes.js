import express from 'express';
import { Todo } from '../models/todos.js';

const router = express.Router();

// Define a map for priority levels
const priorityMap = {
  "high": 3,
  "medium": 2,
  "low": 1
};

// POST route to create a new todo item
router.post('/', async (req, res) => {
  try {
    const { title, isCompleted, priority } = req.body;
    const todo = await Todo.create({ title, isCompleted, priority });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to retrieve all todo items sorted by priority in descending order
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().lean(); // Fetch todos
    // Sort the todos based on priority levels
    todos.sort((a, b) => priorityMap[b.priority] - priorityMap[a.priority]);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to retrieve a specific todo item
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT route to update an existing todo item
router.put('/:id', async (req, res) => {
  try {
    const { title, isCompleted, priority } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title, isCompleted, priority }, { new: true });
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE route to delete a todo item
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (todo) {
      res.status(200).json({ message: 'Todo successfully deleted' });
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
