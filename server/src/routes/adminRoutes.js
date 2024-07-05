const express = require('express');
const router = express.Router();
const { fetchAdminCredentials } = require('../controllers/adminControllers');


router.route('/').get(fetchAdminCredentials);


module.exports = router