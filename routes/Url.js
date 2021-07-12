const express = require('express');
const {check} = require('express-validator');
const validate = require('../middlewares/validate');
const router = express.Router();
const authenticate = require('../middlewares/authenticate')
const UrlController = require('../controllers/UrlController')


router.post('/short', UrlController.shortUrl)
router.post('/r/:urlId', UrlController.redirectUrl)

router.get('/user/user-bylinks', authenticate, UrlController.userBylinks) 

module.exports = router; 