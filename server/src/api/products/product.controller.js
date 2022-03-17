const Product = require('./product.model');
const { setError } = require('../../utils/errors');
const { deleteImgCloudinary } = require('../../middlewares/deleteFile');


const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return next(setError(500, "Fail to get all products"));
    }
}
const getOneProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(setError(404, "Product not found"));
        }
        return res.status(200).json(product);
    } catch (error) {
        return next(setError(500, "Fail to get product"));
    }

}
const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        const duplicateProduct = await Product.findOne({ name: product.name });
        if (duplicateProduct) {
            return next(setError(400, "Product already exists"));
        }

        if (req.file) product.image = req.file.path;

        const newProduct = await product.save();
        return res.status(201).json(newProduct);

    } catch (error) {
        return next(setError(500, "Fail to create product"));
    }

}
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = new Product(req.body);
        if (req.file) product.image = req.file.path
        product._id = id;
        const updateProduct = await Product.findByIdAndUpdate(id, product);
        if (!updateProduct) {
            return next(setError(404, "Product not found"));
        }
        return res.status(200).json(updateProduct);
    } catch (error) {
        return next(setError(500, "Fail to update product"));
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return next(setError(404, "Product not found"));
        }
        if (product.image) deleteImgCloudinary(product.image)
        return res.status(200).json(product);

    } catch (error) {
        return next(setError(500, "Fail to delete product"));
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
