const pool = require('../dbConnection');





const addProduct = async (req, res)=> {
    const imagePath = req.file?.path;
    const { title, description, price, images, stock, category_id, rating, brand } = req.body || {};
    const query = 'INSERT INTO products (title, description, price, thumbnail, images, stock, category_id, rating, brand) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    pool.query(query, [title, description, price, imagePath, images, stock, category_id, rating, brand], (error, results) => {
        if (error) {
            console.error('Error inserting product:', error);
            res.status(500).json({ message: 'Failed to insert product' });
            return;
        }
        console.log('Product inserted successfully');
        console.log(results)
        res.status(200).json({ message: 'Product inserted successfully' });
    });
}
const getProducts = async (req, res)=> {
    const productsLimit = req.query.limit;
    const queryCheck = productsLimit !== undefined && productsLimit !== null;
    const query = queryCheck ? `SELECT * FROM products LIMIT ${productsLimit}` : 'SELECT * FROM products';

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
            return;
        }
        res.json(results)
    })
}
const fetchProductsByCategory = async (req, res)=> {
    const cat_id = req.params.id;
    const query = 'SELECT * FROM products WHERE category_id = ?';
    pool.query(query, [cat_id], (error, results) => {
        if (error) {
            console.error('Error fetching products by category:', err);
            res.status(500).json({ error: 'Error fetching products by category' });
            return;
        }
        res.json(results)
    })
}
const updateProduct = async (req, res)=> {
    const id = req.params.id;
    const { title, description, price, thumbnail, images, stock, category_id, rating, brand } = req.body || {};
    const query = 'UPDATE products SET title=?, description=?, price=?, thumbnail=?, images=?, stock=?, category_id=?, rating=?, brand=? WHERE id=?';

    pool.query(query, [title, description, price, thumbnail, images, stock, category_id, rating, brand, id], (error, results) => {
        if (error) {
            console.error('Error updating product:', err);
            return res.status(500).json({ message: 'Failed to update product' });
        }       
        res.json({ message: 'product updated successfully', results });
    })
}
const deleteProduct = async (req, res)=> {
    const proId = req.params.id;
    const query = 'DELETE FROM products WHERE id = ?';
    
    pool.query(query, [proId], (error, results) => {
        if (error) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Error deleting product' });
            return;
        }
        console.log('product deleted successfully');
        res.status(200).json({ message: 'product deleted successfully' });
    })
}


module.exports = { getProducts, addProduct, fetchProductsByCategory, updateProduct, deleteProduct }