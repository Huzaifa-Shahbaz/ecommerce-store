const express = require('express');
const router = express.Router();
const { insertOrder, fetchOrders } = require('../controllers/ordersControllers');

router.route("/").post(insertOrder);
router.route("/").get(fetchOrders);

module.exports = router;