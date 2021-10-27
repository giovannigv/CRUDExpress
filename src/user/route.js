const route = require('express').Router();
const Controller = require('./controller');

route.get('/users', Controller.getUsers);

route.post('/users', Controller.createUser);

route.put('/users', Controller.updateUser);

route.delete('/users', Controller.deleteUser);

module.exports = route;