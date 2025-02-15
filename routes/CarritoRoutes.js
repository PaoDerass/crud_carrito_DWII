const express = require('express');
const Carrito = require('../models/Carrito');

const router = express.Router();

router.post('/agregar', async (req, res) => {
    try {
        const { idProducto, precio, cantidad } = req.body;
        const total = precio; 

        const nuevoItem = await Carrito.create({
            idProducto,
            precio,
            total,
            estado: 0
        });

        res.status(201).json(nuevoItem);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar al carrito' });
    }
});

module.exports = router;
