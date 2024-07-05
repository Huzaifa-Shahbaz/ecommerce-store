const pool = require('../dbConnection');

const fetchAdminCredentials = async (req, res)=> {
    pool.query('SELECT * FROM admincredentials', (error, results) => {
        if (error) {
            console.error('Error fetching admin credentials:', error);
            res.status(500).json({ error: 'Error fetching admin credentials' });
            return;
        }
        res.json(results);
    })
}

module.exports = { fetchAdminCredentials }