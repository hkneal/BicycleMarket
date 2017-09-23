const authController = require('../../controllers/auth.js');
const router = require('express').Router();

module.exports = router
    .post('/login', authController.login)
    .post('/register', authController.register)
    .post('/block', authController.block)
    .delete('/logout', authController.logout);