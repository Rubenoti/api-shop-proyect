const UserRoutes = require('express').Router();
const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require('./user.controller');

UserRoutes.get('/:id', getUser);
UserRoutes.post('/', createUser);
UserRoutes.patch('/:id', updateUser);
UserRoutes.delete('/:id', deleteUser);

module.exports = UserRoutes;