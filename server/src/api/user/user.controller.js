const User = require('./user.model');
const { setError } = require('../../utils/errors');

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
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
        updateUser._id = id;
        const updateUser = await User.findByIdAndUpdate(id, user, { new: true });
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

const loginUser = async (req, res, next) => { }
const logoutUser = async (req, res, next) => { }

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}
