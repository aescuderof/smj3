const express = require('express');
const { getAllProducts, createProduct, updateProductById, deleteProductById } = require('../controllers/product.controller');
const productRouter = express.Router();

productRouter.get('/', getAllProducts); 
productRouter.post('/', createProduct); 
productRouter.put('/:id', updateProductById); 
productRouter.delete('/:id', deleteProductById); 

module.exports = productRouter;

