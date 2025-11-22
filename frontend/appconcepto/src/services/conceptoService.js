import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const obtenerConceptos = async () => {
    try {
        const response = await axios.get(`${API_URL}/conceptos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener conceptos:', error);
        throw error;
    }
};

export const obtenerConceptoPorId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/conceptos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener concepto:', error);
        throw error;
    }
};

export const crearConcepto = async (datos) => {
    try {
        const response = await axios.post(`${API_URL}/conceptos`, datos);
        return response.data;
    } catch (error) {
        console.error('Error al crear concepto:', error);
        throw error;
    }
};

export const actualizarConcepto = async (id, datos) => {
    try {
        const response = await axios.put(`${API_URL}/conceptos/${id}`, datos);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar concepto:', error);
        throw error;
    }
};

export const eliminarConcepto = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/conceptos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar concepto:', error);
        throw error;
    }
};