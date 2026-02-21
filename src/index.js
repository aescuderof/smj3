require("dotenv").config();
const cors = require('cors');
const express = require("express");

const connectDB = require("./config/db");

const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');

const PORT = process.env.PORT || 5000;

const app = express();

connectDB();

// const whiteList = [
//     'http:localhost:5000',
//     'https:www.render.com/miapp'
// ];

// const corsOptions = {
//     origin: function(origin, callback) {
//         if (!origin) return callback(null, true);

//         if(whiteList.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowd by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// };
// middleware
//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'ok'});
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

// // Crear un endpoint para el usuario que permita obtener todos los usuarios de la base de datos.
// app.get('/users', async (req, res) => {
//     try {
//         const users = await User.find({});
//         return res.status(200).json({ users });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Hubo un error al obtener los usuarios',
//             error: error.message
//         })
//     }
// })


// // Crear un endpoint para el usuario que permita eliminar el usuario en la base de datos.
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
//         return res.status(200).json({ message: 'El usuario se elimino correctamente' });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Hubo un error al eliminar el usuario',
//             error: error.message
//         })
//     }
// })

app.listen(PORT, ()=> {
    console.log('El servidor esta corriendo en el puerto ' + PORT);
})
