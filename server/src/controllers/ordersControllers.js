const pool = require('../dbConnection');



const insertOrder = async (req, res)=> {
    const { orderId, customerName, items, shippingAddress, orderPayment, paymentMethodSelected, status } = req.body || {};
    const query = 'INSERT INTO orders (orderId, customerName, items, shippingAddress, orderPayment, paymentMethodSelected, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [orderId, customerName, items, shippingAddress, orderPayment, paymentMethodSelected, status], (error, results, fields) => {
        if (error) {
            console.error('Error inserting order:', error);
            return res.status(500).json({ message: 'Failed to insert order' });
        }
        console.log('Order inserted successfully');
        console.log(results);
        return res.status(200).json({ message: 'Order inserted successfully' });
    })
}
const fetchOrders = async (req, res)=> {
    pool.query('SELECT * FROM orders', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
            return;
        }
        res.json(results)
    })
}


module.exports = { insertOrder, fetchOrders, }