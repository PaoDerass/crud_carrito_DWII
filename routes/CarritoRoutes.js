const express = require('express');
const Carrito = require('../db/models/Carrito');
const router = express.Router();


router.post('/agregar', async (req, res) => {
    try {
        const { idProducto, precio, total } = req.body;
        
        if (!idProducto || !precio || !total) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const nuevoProducto = await Carrito.create({
            idProducto,
            precio,
            total,
            estado: 'Pendiente de Pago' 
        });

        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'No se pudo agregar el producto al carrito' });
    }
});


router.delete('/eliminar/:id', async (req, res) => {
    try {
        const eliminado = await Carrito.destroy({
            where: { id: req.params.id }
        });

        if (eliminado) {
            res.json({ mensaje: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


router.put('/confirmar-compra', async (req, res) => {
    try {
        const [actualizados] = await Carrito.update(
            { estado: 'Pagado' },
            { where: { estado: 'Pendiente de Pago' } }
        );

        if (actualizados > 0) {
            res.json({ mensaje: `Compra confirmada. ${actualizados} productos actualizados.` });
        } else {
            res.status(400).json({ error: 'No hay productos pendientes de pago' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al confirmar la compra' });
    }
});


router.get('/listar', async (req, res) => {
    try {
        const productosCarrito = await Carrito.findAll();
        res.status(200).json(productosCarrito);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});


router.get('/factura/:id', async (req, res) => {
    try {
        const producto = await Carrito.findByPk(req.params.id);
        
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        const factura = {
            idFactura: producto.id,
            idProducto: producto.idProducto,
            total: producto.total,
            estado: producto.estado,
            fecha: new Date().toISOString()
        };

        res.status(200).json(factura);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la factura' });
    }
});

module.exports = router;
