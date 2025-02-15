const express = require('express');
const cors = require('cors');
const carritoRoutes = require('./routes/CarritoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/carrito', carritoRoutes);

app.listen(5000, () => {
    console.log('Servidor ejecutándose en el puerto 5000');
});
