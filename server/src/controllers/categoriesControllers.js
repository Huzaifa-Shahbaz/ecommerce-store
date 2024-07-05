const pool = require('../dbConnection');


const addCategory = async (req, res)=> {
    const { category_name } = req.body;

    // Check if category with the same name already exists
    pool.query('SELECT * FROM categories WHERE category_name = ?', [category_name], (error, results) => {
        if (error) {
            console.error('Error checking category:', error);
            res.status(500).json({ message: 'Failed to check category' });
            return;
        }

        if (results.length > 0) {
            // Category with the same name already exists
            res.status(400).json({ message: 'Category with the same name already exists' });
            return;
        }

        // Insert new category if it does not already exist
        pool.query('INSERT INTO categories (category_name) VALUES (?)', [category_name], (error, results) => {
            if (error) {
                console.error('Error inserting Category:', error);
                res.status(500).json({ message: 'Failed to insert category' });
                return;
            }
            console.log('Category inserted successfully');
            res.status(200).json({ message: 'Category inserted successfully' });
        });
    });
}
const fetchCategories = async (req, res)=> {
    const categoriesLimit = req.query.limit;
    const queryCheck = categoriesLimit !== undefined && categoriesLimit !== null;
    const query = queryCheck ? `SELECT * FROM categories LIMIT ${categoriesLimit}` : 'SELECT * FROM categories';
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ error: 'Error fetching categories' });
            return;
        }
        res.json(results)
    })
}


module.exports = { addCategory, fetchCategories }