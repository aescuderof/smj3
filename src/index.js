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


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'ok'});
});

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);



app.listen(PORT, ()=> {
    console.log('El servidor esta corriendo en el puerto ' + PORT);
})

module.exports = app; 