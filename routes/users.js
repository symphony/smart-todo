const express = require('express');
const router = express.Router();
const { getUserByName, getUserById } = require('../queries');

router.get('/', (req, res) => {
  const userId = req.cookies.user;
  if (!userId) return res.send(null);
  getUserById(userId)
    .then((user) => {
      res.json(user || null);
    });
});

router.post('/login', (req, res) => {
  const name = req.body.text;
  getUserByName(name)
  .then((user) => {
      res.cookie('user', user.id);
      res.json(user);
    })
    .catch((err) => {
      console.log('error logging in');
      console.error(err);
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.send('done');
});

module.exports = router;