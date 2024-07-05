import { useEffect, useState } from "react";
import axios from 'axios';



const useProductsApi = (endpoint) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = 'http://localhost:3001';
    const url = `${baseUrl}${endpoint}`;


    useEffect(() => {
        fetchData();
    }, [url])

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(true);
        }
    }
    const insertOrder = async (order) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });
            if (!response.ok) {
                console.error('Failed to insert Order')
                throw new Error('Failed to insert Order');
            }
            return await response.json();
        } catch (error) {
            console.error('Error inserting Order:', error);
            throw error;
        }
    }


    const addCategory = async (categoryData) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });
    
            const categoriesData = await response.json();
            
            if (!categoriesData) {
                console.error('Failed to Add Category');
                throw new Error('Failed to Add Category');
            }
            // Check if the response contains a message
            if (categoriesData.message) {
                console.log(categoriesData.message);
            }
            setData(categoriesData);
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                console.error('Error Adding Category: Network error');
            } else if (error.message === 'Category already exists') {
                console.error('Category with the same name already exists');
            } else {
                console.error('Error Adding Category:', error);
            }
            throw error;
        }
    };
    const addProduct = async (prodData) => {
        try {
            const response = await axios.post(url, prodData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data) {
                console.error('Failed to Add Product');
                throw new Error('Failed to Add Product');
            }

            setData([...data, response.data]);
        } catch (error) {
            console.error('Error Adding product:', error);
            throw error;
        }
    };
    const editProduct = async (path, updatedData) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            const data = await response.json();
            console.log('Update Product successful:', data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    const deleteProduct = async (path) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error);
        }
    }
    const productsByCategory = async (path) => {
        try {
            const response = await fetch(`${baseUrl}${path}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error(error);
        }
    }

    return { data, loading, fetchData, productsByCategory, insertOrder, addCategory, addProduct, editProduct, deleteProduct };
};

export default useProductsApi;