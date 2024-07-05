const pool = require('../dbConnection');


const postUser = async (req, res) => {
    const { firstName, password, email } = req.body || {};
    const checkExistingUser = 'SELECT * FROM users WHERE firstName = ? OR email = ?';
    const insertUser = 'INSERT INTO users (firstName, password,  email) VALUES (?, ?, ?)';

    pool.query(checkExistingUser, [firstName, email], (error, results) => {
        if (error) {
            console.error('Error querying database');
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ error: 'User already exists' });
        } else {
            pool.query(insertUser, [firstName, password, email], (error, results, fields) => {
                if (error) {
                    console.error('Error inserting user:', error);
                    res.status(500).json({ message: 'Failed to insert user' });
                    return;
                }
                console.log('User inserted successfully');
                console.log(results)
                res.status(200).json({ message: 'User inserted successfully' });
            });
        }
    })
}
const getUsers = async (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }
        res.json(results);
    });
}
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, password, email, streetAddress, city, phoneNumber } = req.body || {};
    const query = 'UPDATE users SET firstName=?, password=?, email=?, streetAddress=?, city=?, phoneNumber=? WHERE id=?'
    pool.query(query, [firstName, password, email, streetAddress, city, phoneNumber, userId], (error, results, fields) => {
        if (error) {
            console.error('Error updating profile:', err);
            return res.status(500).json({ message: 'Failed to update profile' });
        }
        res.json({ message: 'Profile updated successfully', results });
    });
}
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';

    pool.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ error: 'Error deleting user' });
            return;
        }
        console.log('User deleted successfully');
        res.status(200).json({ message: 'User deleted successfully' });
        // getUsers();
    })
}

module.exports = { getUsers, postUser, deleteUser, updateUser }