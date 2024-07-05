const express = require('express');
const router = express.Router();
const { addCategory, fetchCategories } = require('../controllers/categoriesControllers');


router.route('/').post(addCategory);
router.route('/').get(fetchCategories);


module.exports = router;