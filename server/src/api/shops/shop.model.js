const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    price: { type: Number, require: true },
    quantity: { type: Number, default: 1 },
    paymentMethod: { type: String, default: "COD" },
    status: {
        type: mongoose.Schema.Types.String,
        default: 'pending'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Shop', shopSchema);