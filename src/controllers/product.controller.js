const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al obtener las products',
            error: error.message
        })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, img, currency, slug } = req.body;
        const product = await stripe.products.create({
            name,
            description,
            images: [img],
            metadata: {
                productDescription: description,
                slug
            }
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: price,
            currency,
            product: product.id   
        });

        const newProduct = await Product.create({
            idProd: product.id,
            priceID: stripePrice.id,
            name,
            price,
            description,
            img,
            currency,
            slug
        });

        if (!newProduct) return res.status(400).json({ error: 'No fue posible crear la productra' });

        return res.status(201).json({ datos: newProduct });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al crear la productra',
            error: error.message
        })
    }
}

exports.updateProductById = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description },
            { new: true, runValidators: true }
        )
        if (!updatedProduct) return res.status(404).json({ message: 'Productra no encontrada' });
        return res.status(200).json({ productraActualizada: updatedProduct });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al actualizar la productra',
            error: error.message
        })
    }
}

exports.deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Productra no encontrada' });
        return res.status(200).json({ message: 'La productra se elimino correctamente' });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al eliminar la productra',
            error: error.message
        })
    } 
}