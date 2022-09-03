const routes = require('express').Router();
const court = require('./court');
const user = require('./user');



routes.use('/court', court)
routes.use('/user', user)


module.exports = routes;