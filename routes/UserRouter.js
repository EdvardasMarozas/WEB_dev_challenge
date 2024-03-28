const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const userValidation = require('../requests/UserRequest');

router.post('/login', userController.loginPost, userRequest);
router.post('/show', )
router.post('/create', userController.registerPost, userValidation);
router.patch('/:id/update', userController.update, userValidation.updateUser);

module.exports = router;