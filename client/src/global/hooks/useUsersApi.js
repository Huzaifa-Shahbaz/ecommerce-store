import { useEffect, useState } from 'react';
import axios from 'axios'


const useUsersApi = (endpoint) => {

    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const baseUrl = 'http://localhost:3001';
    const url = `${baseUrl}${endpoint}`;



    useEffect(() => {
        fetchUsers();
    }, [url])

    const insertNewUser = async (user) => {
        try {
            const response = await axios.post(url, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.data.success) {
                console.error('Failed to insert user');
                throw new Error('Failed to insert user');
            }
        } catch (error) {
            setErrorMsg('User already exists');
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            setError(error.message)
        }
    }
    // Update User Record 
    const updateUser = async (path, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            const data = await response.json();
            console.log('Update successful:', data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }
    // Delete User
    const deleteUser = async (path) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            const data = await response.json();
            console.log(data.message);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    }

    return { users, errorMsg, fetchUsers, insertNewUser, updateUser, deleteUser }
};

export default useUsersApi;