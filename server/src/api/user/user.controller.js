const User = require('./user.model');
const { setError } = require('../../utils/errors');
const JwtUtils = require('../../utils/jwt');
const bcrypt = require('bcrypt');


const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('shoppingCart');
        console.log(user);
        if (!user) {
            return next(setError(404, `User with id ${id} not found`));
        }

        return res.status(200).json(user);
    } catch (error) {
        return next(setError(404, "Server failed to get user"));
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const userDuplicate = await User.findOne({ email: user.email });
        if (userDuplicate) {
            return next(setError(400, "email already exists"));
        }
        const userPost = await user.save();
        return res.status(201).json(userPost);
    } catch (error) {
        return next(setError(400, "Server failed to create user"))
    };
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = new User(req.body);
        user._id = id;
        const updateUser = await User.findByIdAndUpdate(id, user);
        if (!updateUser) {
            return next(setError(404, "User not found"));
        }
        return res.status(200).json(updateUser);
    } catch (error) {
        return next(setError(400, "Server failed to update user"))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(setError(404, "User not found"));
        }
        return res.status(200).json(user);
    } catch (error) {
        return next(setError(400, "Server failed to delete user"))
    }
}

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(setError(404, "User not found"));
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = JwtUtils.generateToken(user._id, user.email);
            return res.status(200).json(token)
        }
    } catch (error) {
        return next(setError(400, "Server failed to login user"))
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const token = null;
        return res.status(200).json(token);
    } catch (error) {
        return next(setError(400, "Server failed to logout user"))
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
}
