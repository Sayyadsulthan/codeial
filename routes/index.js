const express = require('express');

const router =  express.Router();

const home_Controller = require('../controllers/home_controller')

// const userController = require('./users');

console.log("router is loading / running")



router.get('/', home_Controller.home );

router.use('/users', require('./users'));

router.use('/posts', require('./posts'));

router.use('/comment', require('./comments'))


module.exports = router;