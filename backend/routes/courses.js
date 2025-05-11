const express = require('express');
const router = express.Router();

// TODO: Add endpoints for managing courses

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Cosmos', description: 'Explore the universe!' },
    // TODO: Add more courses
  ]);
});

module.exports = router;
