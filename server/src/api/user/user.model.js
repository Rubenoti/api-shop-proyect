const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/errors');
const { validationPassword, validationEmail } = require('../../utils/validators');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        email: { type: String, required: false, trim: true, unique: true },
        phone: { type: Number, required: false },
        password: { type: String, required: false, trim: true },
        address: { type: String, required: false, trim: true },
        //shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    }, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (!validationEmail(this.email)) {
        return next(setError(400, 'Email is not valid'))
    } if (!validationPassword(this.password)) {
        return next(setError(400, 'Password is not valid'))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const User = mongoose.model('users', userSchema)
module.exports = User;