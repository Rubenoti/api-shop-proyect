const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth');
const {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
} = require('./user.controller');

UserRoutes.get('/:id', getUser);
UserRoutes.post('/', createUser);
UserRoutes.patch('/:id', updateUser);
UserRoutes.delete('/:id', [isAuth], deleteUser);
UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', [isAuth], logoutUser);

module.exports = UserRoutes;