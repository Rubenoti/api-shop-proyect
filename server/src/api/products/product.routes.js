const ProductRoutes = require('express').Router();
const upload = require('../../middlewares/updateFile');

const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('./product.controller');

ProductRoutes.get('/', getAllProducts);
ProductRoutes.get('/:id', getOneProduct);
ProductRoutes.post('/', upload.single('image'), createProduct);
ProductRoutes.patch('/:id', upload.single('image'), updateProduct);
ProductRoutes.delete('/:id', deleteProduct);

module.exports = ProductRoutes;