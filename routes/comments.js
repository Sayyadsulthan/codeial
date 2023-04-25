const express = require('express');
const router = express.Router();
const passport = require('passport');

const commetController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication, commetController.create);

module.exports = router;