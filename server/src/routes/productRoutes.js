const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const {
    addProduct,
    getProducts,
    fetchProductsByCategory,
    updateProduct,
    deleteProduct
} = require('../controllers/productControllers');


// router.post('/', upload, addProduct);
// router.route("/", upload.single('thumbnail')).post(addProduct);
router.route("/",).post(addProduct);
router.route("/").get(getProducts);
router.route("/by-category/:id").get(fetchProductsByCategory);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);


module.exports = router;
