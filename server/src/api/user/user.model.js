const mongoose = require('mongoose');
const bcryp = require('bcrypt');
const User = mongoose.model('User', userSchema);

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        email: { type: String, required: true, trim: true, unique: true },
        phone: { type: Number, required: true },
        password: { type: String, required: true, trim: true },
        address: { type: String, required: true, trim: true },
        shoppingCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, { type: Number, default: 1 }],
        roles: {
            type: [
                {
                    type: String,
                    "enum": [
                        C.ROLE_ADMIN,
                        C.ROLE_USER,
                    ]
                }
            ],
            "default": [C.ROLE_USER]
        },
    },
    {
        timestamps: true
    });

userSchema.pre('save', function (next) {
    this.password = bcryp.hashSync(this.password, 10);
    next();
});

module.exports = User;