import axios from 'axios';
import type { Product } from './types';

const API_URL = 'http://localhost:8000'; // backend server runs on 8000

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    const response = await api.get<Product[]>('/products');
    return response.data;
};

export const getProduct = async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

export const addProduct = async (product: Product) => {
    const response = await api.post<Product>('/products', product);
    return response.data;
};

export const updateProduct = async (id: number, product: Product) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};
