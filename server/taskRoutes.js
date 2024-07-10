const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, title: 'Sample Task', completed: false }]);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  res.json({ id: Date.now(), title, completed: false });
});

module.exports = router;