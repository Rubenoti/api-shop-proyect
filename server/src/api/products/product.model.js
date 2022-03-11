const mongoose = require('mongoose');
const Product = mongoose.model('Product', productSchema);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        price: { type: Number, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'categorie', required: true, trim: true },


    },
    {
        timestamps: true
    });

module.exports = Product;