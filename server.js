// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

// In-memory storage for menu items and orders
let menuItems = [];
let orders = [];

// Function to update order statuses
const updateOrderStatuses = () => {
    orders.forEach(order => {
        if (order.status === 'Preparing') {
            order.status = 'Out for Delivery';
        } else if (order.status === 'Out for Delivery') {
            order.status = 'Delivered';
        }
    });
};

// Schedule periodic status updates every minute
cron.schedule('* * * * *', updateOrderStatuses);

// Add Menu Item
app.post('/menu', (req, res) => {
    const { name, price, category } = req.body;
    if (price <= 0 || !['Appetizer', 'Main Course', 'Dessert'].includes(category)) {
        return res.status(400).send('Invalid data');
    }
    const newItem = { id: menuItems.length + 1, name, price, category };
    menuItems.push(newItem);
    res.status(201).json(newItem);
});

// Get Menu
app.get('/menu', (req, res) => {
    res.json(menuItems);
});

// Place Order
app.post('/orders', (req, res) => {
    const { itemIds } = req.body;
    const validItems = itemIds.every(id => menuItems.some(item => item.id === id));
    if (!validItems) {
        return res.status(400).send('Invalid item IDs');
    }
    const newOrder = { id: orders.length + 1, itemIds, status: 'Preparing' };
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

// Get Order
app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).send('Order not found');
    }
    res.json(order);
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));