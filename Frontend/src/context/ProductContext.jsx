import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchSettings = async () => {
        try {
            const { data } = await axios.get('/api/settings');
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };


    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const addProduct = async (productData, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.post('/api/products', productData, config);
            setProducts([...products, data]);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to add product' };
        }
    };

    const updateProduct = async (id, productData, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.put(`/api/products/${id}`, productData, config);
            setProducts(products.map((p) => (p._id === id ? data : p)));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to update product' };
        }
    };

    const deleteProduct = async (id, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.delete(`/api/products/${id}`, config);
            setProducts(products.filter((p) => p._id !== id));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to delete product' };
        }
    };

    const addCategory = async (categoryData, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const { data } = await axios.post('/api/categories', categoryData, config);
            setCategories([...categories, data]);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to add category' };
        }
    };

    const deleteCategory = async (id, token) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            await axios.delete(`/api/categories/${id}`, config);
            setCategories(categories.filter((c) => c._id !== id));
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Failed to delete category' };
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchSettings();
    }, []);

    return (
        <ProductContext.Provider value={{
            products,
            categories,
            settings,
            loading,
            fetchProducts,
            fetchCategories,
            fetchSettings,
            addProduct,
            updateProduct,
            deleteProduct,
            addCategory,
            deleteCategory
        }}>

            {children}
        </ProductContext.Provider>
    );
};

