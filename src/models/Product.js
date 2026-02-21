const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        idProd: {
            type: String,
            required: true
        },
        priceID: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String
        },
        img: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

/* Crear un archivo llamado User.js y utilizando una estructura similar a la de la productra, crea un esquema
para un usuario con las propiedades username, email y password las cuales deben ser requeridas y el email unique. */