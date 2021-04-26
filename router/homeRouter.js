const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Futuristic Cookbook API 🚀');
});

module.exports = router;
