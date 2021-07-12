const express = require('express');
const helper = require('../helpers/common')
const urlController = require('../controllers/UrlController')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const auth = require('./auth')
const url = require('./Url')
module.exports = app => {
    app.get('/', (req, res) => {
        return helper.sendResponseMsg(res, "Welcome to BYLink Server. Visit /api/docs for api documentation", true, 200)
    });
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer: true}));
    // app.post('/url/short', urlController.shortUrl)
    // app.get('/url/:urlId', urlController.redirectUrl)
    app.use('/api/url', url)
    // app.use('/api/url/',url)
    app.get('/:urlId', urlController.redirect2Url)
    app.use('/api/auth',auth)

}