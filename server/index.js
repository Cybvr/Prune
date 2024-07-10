const express = require('express');
const path = require('path');
const app = express();
const taskRoutes = require('./taskRoutes');

// Middleware
app.use(express.json());

// API routes
app.use('/api/tasks', taskRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// The "catch-all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});