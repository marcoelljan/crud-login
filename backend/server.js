const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 4000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // default XAMPP user
  password: '',        // default XAMPP password is empty
  database: 'crud_db', // your database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Middleware
app.use(cors());
app.use(express.json());

// Get all items
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new item
app.post('/api/items', (req, res) => {
  const { value } = req.body;
  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid value' });
  }
  db.query('INSERT INTO items (value) VALUES (?)', [value], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Item added', id: result.insertId });
  });
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { value } = req.body;
  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Invalid value' });
  }
  db.query('UPDATE items SET value = ? WHERE id = ?', [value, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item updated' });
  });
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});