// cron.js

const updateOrderStatuses = (orders) => {
    orders.forEach(order => {
        if (order.status === 'Preparing') {
            order.status = 'Out for Delivery';
        } else if (order.status === 'Out for Delivery') {
            order.status = 'Delivered';
        }
    });
};

module.exports = { updateOrderStatuses };