const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: true },
        price: { type: Number, required: false, trim: true },
        image: { type: String, required: false, trim: true },
        category: { type: String, required: false, trim: true },


    },
    {
        timestamps: true
    });
const Product = mongoose.model('products', productSchema);
module.exports = Product;