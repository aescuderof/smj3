const express = require('express');
const { getAllProducts, createProduct, updateProductById, deleteProductById } = require('../controllers/product.controller');
const productRouter = express.Router();

productRouter.get('/', getAllProducts); // localhost:3000/products
productRouter.post('/', createProduct); // localhost:3000/products
productRouter.put('/:id', updateProductById); // localhost:3000/products/:id
productRouter.delete('/:id', deleteProductById); // localhost:3000/products/:id

module.exports = productRouter;

