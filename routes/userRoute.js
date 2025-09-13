const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers} = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);

module.exports = router;